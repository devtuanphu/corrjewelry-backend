module.exports = {
  routes: [
    {
      method: "GET",
      path: "/san-pham/sizes", // URL của route
      handler: "custom-san-pham.findAllSizes", // Controller sẽ được gọi
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/san-pham/by-sale-page", // URL của route
      handler: "custom-san-pham.findAllSaleProducts", // Controller sẽ được gọi
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
