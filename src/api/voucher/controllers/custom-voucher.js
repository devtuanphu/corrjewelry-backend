// path: ./src/api/voucher/controllers/custom-voucher.js

module.exports = {
  // Hàm kiểm tra voucher
  checkVoucher: async (ctx) => {
    const { code, totalAmount } = ctx.request.body; // Lấy mã voucher và tổng tiền từ body của yêu cầu

    if (!code || !totalAmount) {
      return ctx.badRequest("Mã voucher và tổng tiền đơn hàng là bắt buộc.");
    }

    try {
      // Sử dụng strapi.db.query() để truy vấn thông qua Collection Type (api::voucher.voucher)
      const voucher = await strapi.db.query("api::voucher.voucher").findOne({
        where: { code: code }, // Sử dụng where để truy vấn theo code voucher
      });
      console.log(voucher);

      if (!voucher) {
        return ctx.notFound("Voucher không tồn tại.");
      }

      // Kiểm tra xem voucher có hết hạn không
      const currentDate = new Date();
      const expiryDate = new Date(voucher.expiry); // Convert expiry date

      if (currentDate > expiryDate) {
        return ctx.badRequest("Voucher đã hết hạn.");
      }

      // Kiểm tra số lượng voucher còn lại
      if (voucher.so_luong_voucher <= 0) {
        return ctx.badRequest("Voucher đã hết số lượng.");
      }

      // Kiểm tra giá trị đơn hàng có đủ điều kiện để áp dụng voucher không
      if (totalAmount < voucher.gia_tri_don_toi_thieu) {
        return ctx.badRequest(
          `Tổng tiền đơn hàng phải lớn hơn ${voucher.gia_tri_don_toi_thieu.toLocaleString()} để áp dụng voucher này.`
        );
      }

      // Kiểm tra kiểu giảm giá của voucher
      let discount = 0;
      if (voucher.type === "Giảm theo %") {
        discount = (totalAmount * voucher.gia_tri_giam) / 100; // Giảm theo phần trăm
      } else if (voucher.type === "Giảm theo số tiền") {
        discount = voucher.gia_tri_giam; // Giảm theo số tiền cụ thể
      }

      // Nếu tất cả các điều kiện đều hợp lệ, trả về voucher và giá trị giảm giá
      return ctx.send({
        message: "Voucher hợp lệ.",
        voucher: voucher,
        discount: discount,
      });
    } catch (error) {
      strapi.log.error("Lỗi khi kiểm tra voucher:", error);
      return ctx.internalServerError("Đã xảy ra lỗi khi kiểm tra voucher.");
    }
  },
};
