module.exports = {
  async afterCreate(event) {
    const { result, params } = event;
    console.log(params);

    try {
      // Lấy userId từ params
      const userId = params.data.user;

      if (!userId) {
        console.log("Không tìm thấy userId trong params");
        return;
      }

      // Sử dụng entityService để truy vấn người dùng từ plugin users-permissions
      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user", // Sử dụng đúng namespace và model
        userId, // ID người dùng
        { populate: ["carts"] } // Chỉ cần populate mảng carts
      );
      console.log(user);

      // Kiểm tra nếu user tồn tại và có giỏ hàng
      if (user && user.carts && user.carts.length > 0) {
        // Làm rỗng giỏ hàng của người dùng
        user.carts = []; // Gán lại giỏ hàng thành mảng rỗng

        // Cập nhật lại dữ liệu người dùng trong cơ sở dữ liệu
        await strapi.entityService.update(
          "plugin::users-permissions.user",
          userId,
          { data: { carts: [] } }
        );

        console.log(
          `Giỏ hàng của người dùng với ID ${userId} đã được làm rỗng.`
        );
      } else {
        console.log(`Không tìm thấy giỏ hàng của người dùng với ID ${userId}`);
      }

      // Kiểm tra voucher và giảm so_luong nếu có voucher
      const voucherId = params.data.voucher; // Lấy voucher ID từ params
      if (voucherId) {
        // Truy vấn voucher từ bảng voucher
        const voucher = await strapi.entityService.findOne(
          "api::voucher.voucher", // Đảm bảo tên model đúng
          voucherId
        );

        if (voucher) {
          console.log("Voucher found:", voucher);

          // Kiểm tra nếu voucher còn đủ số lượng
          if (voucher.so_luong > 0) {
            // Giảm số lượng voucher
            await strapi.entityService.update(
              "api::voucher.voucher", // Đảm bảo tên model đúng
              voucherId,
              { data: { so_luong: voucher.so_luong - 1 } }
            );
            console.log(`Giảm số lượng voucher ID ${voucherId} đi 1.`);
          } else {
            console.log(`Voucher ID ${voucherId} đã hết số lượng.`);
          }
        } else {
          console.log(`Không tìm thấy voucher với ID ${voucherId}`);
        }
      }
    } catch (error) {
      console.error("Lỗi khi xử lý đơn hàng:", error);
    }
  },
  async afterUpdate(event) {
    const { result, params } = event;
    console.log(params);

    // Kiểm tra nếu 'remember' là true
    if (params.data.remember) {
      try {
        // Lấy userId từ params (user trong đơn hàng)
        const userId = params.data.user;

        if (!userId) {
          console.log("Không tìm thấy userId trong params");
          return;
        }

        // Truy vấn người dùng từ plugin users-permissions
        const user = await strapi.entityService.findOne(
          "plugin::users-permissions.user", // Sử dụng đúng namespace và model
          userId // ID người dùng
        );

        if (user) {
          // Cập nhật thông tin người dùng nếu tìm thấy
          const updatedUserData = {
            firstName: params.data.firstName || user.firstName,
            lastName: params.data.lastName || user.lastName,
            phone: params.data.phone || user.phone,
            email: params.data.email || user.email,
            address: params.data.address || user.address,
          };

          // Cập nhật thông tin người dùng
          await strapi.entityService.update(
            "plugin::users-permissions.user", // Cập nhật người dùng
            userId,
            { data: updatedUserData }
          );

          console.log(`Cập nhật thông tin người dùng với ID ${userId}`);
        } else {
          console.log(`Không tìm thấy người dùng với ID ${userId}`);
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật thông tin người dùng:", error);
      }
    }
  },
};
