module.exports = {
  async findAllProducts(ctx) {
    try {
      // Lấy tham số 'category', 'size', 'isBestSeller', 'isNewArrival', 'isSaleHome' từ query params (nếu có)
      const {
        page = 1,
        pageSize = 10,
        category = null,
        size = null,
        isBestSeller = null,
        isNewArrival = null,
        isSaleHome = null,
        startPrice = 0, // Thêm startPrice
        endPrice = Infinity, // Thêm endPrice
      } = ctx.query;
      const pageNumber = parseInt(page, 10);
      const pageSizeNumber = parseInt(pageSize, 10);
      const sizeArray = size ? size.split(",").map((s) => s.trim()) : [];
      // Lấy Nam từ Strapi (single type)
      const nam = await strapi.entityService.findOne("api::nam.nam", 1, {
        populate: {
          danh_muc_con: {
            populate: {
              danh_muc_chi_tiet: {
                populate: {
                  san_phams: {
                    populate: {
                      size: true,
                      images: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!nam) {
        return ctx.notFound("Nam không tồn tại");
      }

      // Mảng chứa tất cả các sản phẩm
      let allProducts = [];

      // Duyệt qua tất cả danh mục con
      nam.danh_muc_con.forEach((danhMucCon) => {
        // Nếu có tham số category, kiểm tra xem danh mục con có trùng với category hay không
        if (category && danhMucCon.title === category) {
          // Duyệt qua danh mục chi tiết và lấy sản phẩm
          danhMucCon.danh_muc_chi_tiet.forEach((danhMucChiTiet) => {
            // Lọc sản phẩm theo size và các trường boolean nếu có
            const filteredProducts = danhMucChiTiet.san_phams.filter(
              (product) => {
                // Kiểm tra nếu có size, và kiểm tra sản phẩm có size trùng với tham số size
                const matchesSize =
                  sizeArray.length > 0
                    ? product.size.some((productSize) =>
                        sizeArray.includes(productSize.size)
                      )
                    : true;

                // Kiểm tra các tham số boolean
                const matchesBestSeller =
                  isBestSeller !== null
                    ? product.isBestSeller === JSON.parse(isBestSeller)
                    : true;
                const matchesNewArrival =
                  isNewArrival !== null
                    ? product.isNewArrival === JSON.parse(isNewArrival)
                    : true;
                const matchesSaleHome =
                  isSaleHome !== null
                    ? product.isSaleHome === JSON.parse(isSaleHome)
                    : true;

                // Kiểm tra sản phẩm có giá trong khoảng giá không
                const productPriceInRange = product.size.some((productSize) => {
                  const originalPrice = productSize.price;
                  const percentSale = product.percentSale || 0;
                  const salePrice =
                    originalPrice - (originalPrice * percentSale) / 100;
                  return salePrice >= startPrice && salePrice <= endPrice;
                });

                return (
                  matchesSize &&
                  matchesBestSeller &&
                  matchesNewArrival &&
                  matchesSaleHome &&
                  productPriceInRange // Kiểm tra nếu giá sản phẩm nằm trong khoảng
                );
              }
            );
            allProducts = [...allProducts, ...filteredProducts];
          });
        } else if (!category) {
          // Nếu không có category, lấy tất cả sản phẩm của tất cả danh mục con
          danhMucCon.danh_muc_chi_tiet.forEach((danhMucChiTiet) => {
            const filteredProducts = danhMucChiTiet.san_phams.filter(
              (product) => {
                // Kiểm tra nếu có size, và kiểm tra sản phẩm có size trùng với tham số size
                const matchesSize =
                  sizeArray.length > 0
                    ? product.size.some((productSize) =>
                        sizeArray.includes(productSize.size)
                      )
                    : true;

                // Kiểm tra các tham số boolean
                const matchesBestSeller =
                  isBestSeller !== null
                    ? product.isBestSeller === JSON.parse(isBestSeller)
                    : true;
                const matchesNewArrival =
                  isNewArrival !== null
                    ? product.isNewArrival === JSON.parse(isNewArrival)
                    : true;
                const matchesSaleHome =
                  isSaleHome !== null
                    ? product.isSaleHome === JSON.parse(isSaleHome)
                    : true;

                // Kiểm tra sản phẩm có giá trong khoảng giá không
                const productPriceInRange = product.size.some((productSize) => {
                  const originalPrice = productSize.price;
                  const percentSale = product.percentSale || 0;
                  const salePrice =
                    originalPrice - (originalPrice * percentSale) / 100;
                  return salePrice >= startPrice && salePrice <= endPrice;
                });

                return (
                  matchesSize &&
                  matchesBestSeller &&
                  matchesNewArrival &&
                  matchesSaleHome &&
                  productPriceInRange // Kiểm tra nếu giá sản phẩm nằm trong khoảng
                );
              }
            );
            allProducts = [...allProducts, ...filteredProducts];
          });
        }
      });

      // Sử dụng phân trang
      const totalItems = allProducts.length;
      const totalPages = Math.ceil(totalItems / pageSizeNumber);

      const start = (pageNumber - 1) * pageSizeNumber;
      const end = start + pageSizeNumber;
      const paginatedItems = allProducts.slice(start, end);

      // Trả về dữ liệu phân trang
      return ctx.send({
        data: paginatedItems,
        meta: {
          page: pageNumber,
          pageSize: pageSizeNumber,
          totalItems,
          totalPages,
        },
      });
    } catch (error) {
      console.error("Lỗi khi truy vấn sản phẩm:", error);
      return ctx.internalServerError("Có lỗi khi truy vấn sản phẩm.");
    }
  },
  async findAllDanhMucCon(ctx) {
    try {
      const nam = await strapi.entityService.findOne("api::nam.nam", 1, {
        populate: {
          danh_muc_con: true, // chỉ lấy raw danh_muc_con
        },
      });

      if (!nam) {
        return ctx.notFound("Không tìm thấy dữ liệu danh mục NAM.");
      }

      const danhMucConList = nam.danh_muc_con.map((item) => ({
        id: item.id,
        title: item.title,
      }));

      return ctx.send({
        data: danhMucConList,
      });
    } catch (error) {
      console.error("Lỗi khi lấy danh mục con:", error);
      return ctx.internalServerError("Có lỗi xảy ra khi lấy danh mục con.");
    }
  },
  async findProductsByCategorySlug(ctx) {
    try {
      const { slug, page = 1, pageSize = 10 } = ctx.query;

      // Tìm đối tượng 'nam' từ Strapi
      const nam = await strapi.entityService.findOne("api::nam.nam", 1, {
        populate: {
          danh_muc_con: {
            populate: {
              danh_muc_chi_tiet: {
                populate: {
                  san_phams: {
                    populate: {
                      size: true,
                      images: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      // Kiểm tra nếu 'nam' không tồn tại
      if (!nam) {
        return ctx.notFound("Nam không tồn tại");
      }

      // Lấy danh mục con (category) có slug tương ứng
      const danhMucCon = nam.danh_muc_con.find(
        (category) => category.slug === slug
      );

      if (!danhMucCon) {
        return ctx.notFound("Danh mục không tồn tại");
      }

      // Mảng chứa tất cả các sản phẩm từ các danh mục chi tiết của danh mục con
      let allProducts = [];

      // Duyệt qua tất cả các danh mục chi tiết của danh mục con
      danhMucCon.danh_muc_chi_tiet.forEach((danhMucChiTiet) => {
        // Duyệt qua tất cả các sản phẩm trong mỗi danh mục chi tiết
        allProducts = [...allProducts, ...danhMucChiTiet.san_phams];
      });

      // Phân trang sản phẩm
      const totalItems = allProducts.length;
      const totalPages = Math.ceil(totalItems / pageSize);
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedItems = allProducts.slice(start, end);

      // Trả về dữ liệu sản phẩm với phân trang
      return ctx.send({
        data: paginatedItems,
        meta: {
          page,
          pageSize,
          totalItems,
          totalPages,
        },
      });
    } catch (error) {
      console.error("Lỗi khi truy vấn sản phẩm:", error);
      return ctx.internalServerError("Có lỗi khi truy vấn sản phẩm.");
    }
  },

  async findCategoryBySlug(ctx) {
    try {
      const { slug } = ctx.query;

      // Tìm đối tượng 'nam' từ Strapi
      const nam = await strapi.entityService.findOne("api::nam.nam", 1, {
        populate: {
          danh_muc_con: {
            populate: {
              seo: { populate: { thumbnail: true } },
            },
          },
        },
      });

      // Kiểm tra nếu 'nam' không tồn tại
      if (!nam) {
        return ctx.notFound("Nam không tồn tại");
      }

      // Lấy danh mục con (category) có slug tương ứng
      const danhMucCon = nam.danh_muc_con.find(
        (category) => category.slug === slug
      );

      if (!danhMucCon) {
        return ctx.notFound("Danh mục không tồn tại");
      }

      // Trả về title và seo của danh mục con
      return ctx.send({
        title: danhMucCon.title,
        seo: danhMucCon.seo || {}, // Trả về seo nếu có
      });
    } catch (error) {
      console.error("Lỗi khi truy vấn danh mục con:", error);
      return ctx.internalServerError("Có lỗi khi truy vấn danh mục con.");
    }
  },

  async findProductsByCategoryDetailSlug(ctx) {
    try {
      const {
        categorySlug,
        categoryDetailSlug,
        page = 1,
        pageSize = 10,
      } = ctx.query;

      // Lấy đối tượng 'nam' từ Strapi
      const nam = await strapi.entityService.findOne("api::nam.nam", 1, {
        populate: {
          danh_muc_con: {
            populate: {
              danh_muc_chi_tiet: {
                populate: {
                  san_phams: {
                    populate: {
                      size: true,
                      images: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      // Kiểm tra nếu 'nam' không tồn tại
      if (!nam) {
        return ctx.notFound("Nam không tồn tại");
      }

      // Lấy danh mục con (category) có slug tương ứng
      const danhMucCon = nam.danh_muc_con.find(
        (category) => category.slug === categorySlug
      );

      if (!danhMucCon) {
        return ctx.notFound("Danh mục không tồn tại");
      }

      // Lấy danh mục chi tiết có slug tương ứng trong danh mục con
      const danhMucChiTiet = danhMucCon.danh_muc_chi_tiet.find(
        (categoryDetail) => categoryDetail.slug === categoryDetailSlug
      );

      if (!danhMucChiTiet) {
        return ctx.notFound("Danh mục chi tiết không tồn tại");
      }

      // Lấy tất cả sản phẩm trong danh mục chi tiết này
      const allProducts = danhMucChiTiet.san_phams;

      // Phân trang sản phẩm
      const totalItems = allProducts.length;
      const totalPages = Math.ceil(totalItems / pageSize);
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedItems = allProducts.slice(start, end);

      // Trả về dữ liệu sản phẩm với phân trang
      return ctx.send({
        data: paginatedItems,
        meta: {
          page,
          pageSize,
          totalItems,
          totalPages,
        },
      });
    } catch (error) {
      console.error("Lỗi khi truy vấn sản phẩm:", error);
      return ctx.internalServerError("Có lỗi khi truy vấn sản phẩm.");
    }
  },
};
