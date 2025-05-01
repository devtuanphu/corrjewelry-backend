module.exports = {
  getOrderByUserId: async (ctx) => {
    try {
      // Lấy userId từ query params
      const { userId } = ctx.params;

      // Lấy tham số phân trang từ query params, nếu không có thì mặc định là 10 bản ghi mỗi trang
      const { page = 1, pageSize = 10 } = ctx.query; // page: trang hiện tại, pageSize: số lượng bản ghi mỗi trang

      // Kiểm tra xem userId có tồn tại không
      if (!userId) {
        return ctx.badRequest("User ID is required");
      }

      // Truy vấn các đơn hàng liên quan đến userId và thêm phân trang
      const orders = await strapi.entityService.findMany(
        "api::don-hang.don-hang",
        {
          filters: {
            user: {
              id: userId,
            },
          },
          populate: ["user", "items", "voucher"], // Populate thông tin liên quan
          pagination: {
            start: (page - 1) * pageSize, // Tính toán vị trí bắt đầu
            limit: pageSize, // Số bản ghi trên mỗi trang
          },
        }
      );

      // Kiểm tra nếu không tìm thấy đơn hàng
      if (!orders || orders.length === 0) {
        return ctx.notFound("No orders found for this user");
      }

      // Lấy tổng số bản ghi (để tính toán phân trang)
      const totalCount = await strapi.entityService.count(
        "api::don-hang.don-hang",
        {
          filters: {
            user: {
              id: userId,
            },
          },
        }
      );

      // Trả về các đơn hàng và thông tin phân trang
      return ctx.send({
        data: orders,
        meta: {
          pagination: {
            total: totalCount,
            page: parseInt(page, 10),
            pageSize: parseInt(pageSize, 10),
            pageCount: Math.ceil(totalCount / pageSize),
          },
        },
      });
    } catch (error) {
      console.error(error);
      return ctx.internalServerError(
        "Something went wrong while fetching orders"
      );
    }
  },
};
