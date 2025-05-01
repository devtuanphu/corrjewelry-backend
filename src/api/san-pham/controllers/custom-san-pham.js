module.exports = {
  async findAllSizes(ctx) {
    try {
      // Truy vấn tất cả sản phẩm từ Strapi
      const products = await strapi.entityService.findMany(
        "api::san-pham.san-pham",
        {
          populate: {
            size: true, // Lấy thông tin size của mỗi sản phẩm
          },
        }
      );

      // Mảng để chứa tất cả các size
      let allSizes = [];

      // Duyệt qua tất cả các sản phẩm và lấy size
      products.forEach((product) => {
        if (product.size && Array.isArray(product.size)) {
          // Thêm tất cả size của sản phẩm vào mảng allSizes
          allSizes = [...allSizes, ...product.size.map((item) => item.size)];
        }
      });

      // Loại bỏ các size trùng lặp
      const uniqueSizes = [...new Set(allSizes)];

      // Trả về kết quả
      return ctx.send({
        data: uniqueSizes, // Trả về tất cả size không trùng
      });
    } catch (error) {
      console.error("Lỗi khi truy vấn size:", error);
      return ctx.internalServerError("Có lỗi khi truy vấn size sản phẩm.");
    }
  },
  async findAllSaleProducts(ctx) {
    try {
      // Lấy page và pageSize từ query params
      const { page = 1, pageSize = 10 } = ctx.query;
      const pageNumber = parseInt(page, 10);
      const pageSizeNumber = parseInt(pageSize, 10);

      // Truy vấn tất cả sản phẩm có isSalePage = true từ Strapi với phân trang
      const saleProducts = await strapi.entityService.findMany(
        "api::san-pham.san-pham",
        {
          filters: {
            isSalePage: true, // Lọc sản phẩm có isSalePage = true
          },
          populate: {
            size: true, // Lấy thông tin size của mỗi sản phẩm
            images: true, // Có thể lấy thêm thông tin ảnh nếu cần
          },
          pagination: {
            page: pageNumber,
            pageSize: pageSizeNumber,
          },
        }
      );

      // Trả về kết quả các sản phẩm sale với phân trang
      return ctx.send({
        data: saleProducts, // Trả về tất cả sản phẩm có isSalePage = true
        meta: {
          page: pageNumber,
          pageSize: pageSizeNumber,
          totalItems: saleProducts.length,
          totalPages: Math.ceil(saleProducts.length / pageSizeNumber),
        },
      });
    } catch (error) {
      console.error("Lỗi khi truy vấn sản phẩm sale:", error);
      return ctx.internalServerError("Có lỗi khi truy vấn sản phẩm sale.");
    }
  },
};
