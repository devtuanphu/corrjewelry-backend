// path: ./src/api/voucher/routes/custom-voucher.js

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/voucher/check", // Định nghĩa đường dẫn cho API kiểm tra voucher
      handler: "custom-voucher.checkVoucher", // Liên kết với hàm checkVoucher trong controller
      config: {
        policies: [], // Bạn có thể thêm các policy nếu cần
        middlewares: [], // Thêm middleware nếu cần
      },
    },
  ],
};
