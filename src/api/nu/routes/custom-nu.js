module.exports = {
  routes: [
    {
      method: "GET",
      path: "/nus/products",
      handler: "custom-nu.findAllProducts", // Gọi phương thức findAllProducts trong controller
      config: {
        policies: [], // Bạn có thể thêm các policy nếu cần
        middlewares: [], // Thêm middleware nếu cần
      },
    },
    {
      method: "GET",
      path: "/nus/danh-muc-con",
      handler: "custom-nu.findAllDanhMucCon",
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/nus/danh-muc-con-by-slug",
      handler: "custom-nu.findProductsByCategorySlug",
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/nus/chi-tiet-danh-muc-con",
      handler: "custom-nu.findCategoryBySlug",
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/nus/san-pham-danh-muc-chi-tiet",
      handler: "custom-nu.findProductsByCategoryDetailSlug",
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
};
