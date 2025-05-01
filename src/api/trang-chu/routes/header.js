"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/header", // Địa chỉ API bạn muốn sử dụng
      handler: "header.header",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
