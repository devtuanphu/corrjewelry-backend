module.exports = {
  routes: [
    {
      method: "GET",
      path: "/unisexs/products",
      handler: "custom-unisex.findAllProducts", // Gọi phương thức findAllProducts trong controller
      config: {
        policies: [], // Bạn có thể thêm các policy nếu cần
        middlewares: [], // Thêm middleware nếu cần
      },
    },
    {
      method: "GET",
      path: "/unisexs/danh-muc-con",
      handler: "custom-unisex.findAllDanhMucCon",
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/unisexs/danh-muc-con-by-slug",
      handler: "custom-unisex.findProductsByCategorySlug",
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/unisexs/chi-tiet-danh-muc-con",
      handler: "custom-unisex.findCategoryBySlug",
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/unisexs/san-pham-danh-muc-chi-tiet",
      handler: "custom-unisex.findProductsByCategoryDetailSlug",
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
};
