module.exports = {
  routes: [
    {
      method: "GET",
      path: "/don-hang/user/:userId",
      handler: "custom-donhang.getOrderByUserId", // Chỉ định controller và function
      config: {
        policies: [], // Bạn có thể thêm các policy nếu cần
        middlewares: [], // Thêm middleware nếu cần
      },
    },
  ],
};
