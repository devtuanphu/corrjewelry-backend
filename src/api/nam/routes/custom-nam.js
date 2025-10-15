module.exports = {
  routes: [
    {
      method: "GET",
      path: "/nams/products",
      handler: "custom-nam.findAllProducts", // Gọi phương thức findAllProducts trong controller
      config: {
        policies: [], // Bạn có thể thêm các policy nếu cần
        middlewares: [], // Thêm middleware nếu cần
      },
    },
    {
      method: "GET",
      path: "/nams/danh-muc-con",
      handler: "custom-nam.findAllDanhMucCon",
      config: {
        policies: [], // Bạn có thể thêm các policy nếu cần
        middlewares: [], // Thêm middleware nếu cần
      },
    },
    {
      method: "GET",
      path: "/nams/danh-muc-con-by-slug",
      handler: "custom-nam.findProductsByCategorySlug",
      config: {
        policies: [], // Bạn có thể thêm các policy nếu cần
        middlewares: [], // Thêm middleware nếu cần
      },
    },
    {
      method: "GET",
      path: "/nams/chi-tiet-danh-muc-con",
      handler: "custom-nam.findCategoryBySlug",
      config: {
        policies: [], // Bạn có thể thêm các policy nếu cần
        middlewares: [], // Thêm middleware nếu cần
      },
    },
    {
      method: "GET",
      path: "/nams/san-pham-danh-muc-chi-tiet",
      handler: "custom-nam.findProductsByCategoryDetailSlug",
      config: {
        policies: [], // Bạn có thể thêm các policy nếu cần
        middlewares: [], // Thêm middleware nếu cần
      },
    },
  ],
};
