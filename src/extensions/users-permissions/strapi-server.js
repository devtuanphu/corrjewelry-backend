const user = require("./content-types/user");

module.exports = (plugin) => {
  plugin.contentTypes.user = user;

  plugin.routes["content-api"].routes.push(
    {
      method: "POST",
      path: "/users/:userId/cart/products", // Route tạo đơn hàng mới và thêm sản phẩm
      handler: "user.addProductToNewCart",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/users/:userId/cart",
      handler: "user.getCartItems",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/users/:userId/cart/products/:idCart/:action", // Route tăng hoặc giảm số lượng sản phẩm trong giỏ hàng
      handler: "user.updateCartItemQuantity",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/users/:userId/cart/products/:idCart", // Route xóa sản phẩm khỏi giỏ hàng
      handler: "user.removeProductFromCart",
      config: {
        policies: [],
        middlewares: [],
      },
    }
  );

  plugin.controllers.user.addProductToNewCart = async (ctx) => {
    const { userId } = ctx.params; // Lấy userId từ URL
    const { productId, amount, size, price, noted } = ctx.request.body; // Lấy productId, amount, size, price từ body yêu cầu

    if (!userId || !productId || !amount || !size || !price) {
      return ctx.badRequest(
        "User ID, Product ID, Amount, Size và Price là bắt buộc."
      );
    }

    try {
      // Lấy thông tin người dùng từ userId
      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        userId,
        { populate: ["carts", "carts.san_pham"] } // Populate carts và san_pham để lấy thông tin giỏ hàng và sản phẩm
      );

      if (!user) {
        return ctx.notFound("Không tìm thấy người dùng.");
      }

      // Kiểm tra nếu sản phẩm tồn tại
      const product = await strapi.entityService.findOne(
        "api::san-pham.san-pham", // Định dạng đúng cho mô hình sản phẩm
        productId
      );

      if (!product) {
        return ctx.notFound("Không tìm thấy sản phẩm.");
      }

      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa, nếu có thì chỉ cần tăng số lượng
      const existingCartItem = user.carts.find(
        (item) => item.san_pham.id === product.id && item.size === size // So sánh sản phẩm và size
      );

      // Nếu sản phẩm đã có trong giỏ hàng, chỉ cần tăng số lượng
      if (existingCartItem) {
        existingCartItem.amount += amount; // Tăng số lượng sản phẩm lên

        // Cập nhật lại giỏ hàng của người dùng
        await strapi.entityService.update(
          "plugin::users-permissions.user",
          userId,
          {
            data: { carts: user.carts },
          }
        );

        return ctx.send({
          message: "Số lượng sản phẩm đã được cập nhật trong giỏ hàng.",
          cart: existingCartItem, // Trả về sản phẩm đã được cập nhật
        });
      }

      // Nếu sản phẩm chưa có trong giỏ hàng, tạo mới mục giỏ hàng
      const newCartItem = {
        san_pham: product.id, // Liên kết sản phẩm vào giỏ hàng, chỉ lưu ID của sản phẩm
        amount: amount || 1, // Số lượng sản phẩm, mặc định 1 nếu không có
        size: size, // Size của sản phẩm
        price: price || 0, // Giá của sản phẩm
        idCart: user.carts.length + 1, // Tạo ID cho mục giỏ hàng, có thể thay đổi cách tạo ID
        noted: noted,
      };

      // Nếu người dùng chưa có giỏ hàng, khởi tạo mảng carts
      if (!user.carts) {
        user.carts = [];
      }

      // Thêm mục giỏ hàng mới vào mảng carts của người dùng
      user.carts.push(newCartItem);

      // Cập nhật lại thông tin người dùng với giỏ hàng mới
      await strapi.entityService.update(
        "plugin::users-permissions.user",
        userId,
        {
          data: { carts: user.carts },
        }
      );

      // Trả về thông tin giỏ hàng đã thêm sản phẩm
      return ctx.send({
        message: "Thêm sản phẩm vào giỏ hàng thành công.",
        cart: newCartItem, // Trả về mục giỏ hàng đã tạo
      });
    } catch (error) {
      strapi.log.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      return ctx.internalServerError(
        "Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng."
      );
    }
  };

  plugin.controllers.user.getCartItems = async (ctx) => {
    const { userId } = ctx.params; // Lấy userId từ URL

    if (!userId) {
      return ctx.badRequest("User ID là bắt buộc.");
    }

    try {
      // Lấy thông tin người dùng từ userId và populate carts
      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        userId,
        { populate: ["carts", "carts.san_pham"] } // Populate mảng carts và san_pham
      );

      if (!user) {
        return ctx.notFound("Không tìm thấy người dùng.");
      }

      // Nếu người dùng không có giỏ hàng
      if (!user.carts || user.carts.length === 0) {
        return ctx.send({
          message: "Giỏ hàng của bạn đang trống.",
          carts: [],
        });
      }

      // Lấy chi tiết từng sản phẩm trong giỏ hàng
      const cartItems = await Promise.all(
        user.carts.map(async (cartItem) => {
          // Kiểm tra xem sản phẩm trong giỏ hàng có tồn tại hay không
          if (!cartItem.san_pham || !cartItem.san_pham.id) {
            return null; // Tránh lỗi nếu san_pham không có id
          }

          const product = await strapi.entityService.findOne(
            "api::san-pham.san-pham", // Sản phẩm
            cartItem.san_pham.id, // Lấy id sản phẩm từ cartItem
            {
              populate: ["size", "images"], // Populate size và images
            }
          );

          if (!product) {
            return null; // Nếu không tìm thấy sản phẩm, trả về null
          }

          // Trả về thông tin giỏ hàng kết hợp với thông tin sản phẩm
          return {
            san_pham: product, // Đối tượng sản phẩm
            amount: cartItem.amount, // Số lượng sản phẩm
            size: cartItem.size, // Kích thước của sản phẩm
            price: cartItem.price || product.price, // Giá sản phẩm (lấy giá trong cart nếu có, nếu không lấy giá sản phẩm mặc định)
            idCart: cartItem.idCart,
            noted: cartItem.noted,
          };
        })
      );

      // Lọc bỏ các sản phẩm không tìm thấy
      const validCartItems = cartItems.filter((item) => item !== null);

      return ctx.send({
        message: "Danh sách giỏ hàng",
        carts: validCartItems, // Trả về thông tin giỏ hàng của người dùng
      });
    } catch (error) {
      strapi.log.error("Lỗi khi lấy giỏ hàng:", error);
      return ctx.internalServerError(
        "Đã xảy ra lỗi khi lấy giỏ hàng của người dùng."
      );
    }
  };

  plugin.controllers.user.updateCartItemQuantity = async (ctx) => {
    const { userId, idCart, action } = ctx.params; // Lấy userId, idCart và action từ URL hoặc body
    // action: "increase" (tăng số lượng) hoặc "decrease" (giảm số lượng)

    if (!userId || !idCart || !action) {
      return ctx.badRequest("User ID, idCart, và Action là bắt buộc.");
    }

    if (action !== "increase" && action !== "decrease") {
      return ctx.badRequest("Action phải là 'increase' hoặc 'decrease'.");
    }

    try {
      // Lấy thông tin người dùng từ userId
      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        userId,
        { populate: ["carts", "carts.san_pham"] } // Populate carts và san_pham để lấy thông tin giỏ hàng và sản phẩm
      );

      if (!user) {
        return ctx.notFound("Không tìm thấy người dùng.");
      }

      // Tìm mục giỏ hàng theo idCart
      const cartItem = user.carts.find(
        (item) => item.idCart === parseInt(idCart)
      );

      if (!cartItem) {
        return ctx.notFound("Không tìm thấy sản phẩm trong giỏ hàng.");
      }

      // Kiểm tra nếu action là 'increase', tăng số lượng
      if (action === "increase") {
        cartItem.amount += 1;
      }

      // Kiểm tra nếu action là 'decrease', giảm số lượng (không giảm dưới 1)
      if (action === "decrease" && cartItem.amount > 1) {
        cartItem.amount -= 1;
      }

      // Cập nhật lại giỏ hàng của người dùng
      await strapi.entityService.update(
        "plugin::users-permissions.user",
        userId,
        {
          data: { carts: user.carts },
        }
      );

      // Trả về thông tin giỏ hàng đã được cập nhật
      return ctx.send({
        message: `Số lượng sản phẩm trong giỏ hàng đã được ${
          action === "increase" ? "tăng" : "giảm"
        }.`,
        cart: cartItem, // Trả về sản phẩm đã được cập nhật
      });
    } catch (error) {
      strapi.log.error(
        "Lỗi khi cập nhật số lượng sản phẩm trong giỏ hàng:",
        error
      );
      return ctx.internalServerError("Đã xảy ra lỗi khi cập nhật giỏ hàng.");
    }
  };
  plugin.controllers.user.removeProductFromCart = async (ctx) => {
    const { userId, idCart } = ctx.params; // Lấy userId và idCart từ URL

    if (!userId || !idCart) {
      return ctx.badRequest("User ID và ID Cart là bắt buộc.");
    }

    try {
      // Lấy thông tin người dùng từ userId
      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        userId,
        { populate: ["carts", "carts.san_pham"] } // Populate carts và san_pham để lấy thông tin giỏ hàng và sản phẩm
      );

      if (!user) {
        return ctx.notFound("Không tìm thấy người dùng.");
      }

      // Tìm sản phẩm trong giỏ hàng theo idCart
      const cartIndex = user.carts.findIndex(
        (item) => item.idCart === parseInt(idCart)
      );

      if (cartIndex === -1) {
        return ctx.notFound("Không tìm thấy sản phẩm trong giỏ hàng.");
      }

      // Xóa sản phẩm khỏi giỏ hàng
      user.carts.splice(cartIndex, 1);

      // Cập nhật lại giỏ hàng của người dùng
      await strapi.entityService.update(
        "plugin::users-permissions.user",
        userId,
        {
          data: { carts: user.carts },
        }
      );

      // Trả về thông báo và thông tin giỏ hàng đã được cập nhật
      return ctx.send({
        message: "Sản phẩm đã được xóa khỏi giỏ hàng.",
        carts: user.carts, // Trả về giỏ hàng mới
      });
    } catch (error) {
      strapi.log.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
      return ctx.internalServerError("Đã xảy ra lỗi khi xóa sản phẩm.");
    }
  };

  return plugin;
};
