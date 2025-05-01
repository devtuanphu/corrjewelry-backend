"use strict";

module.exports = {
  // Controller để lấy dữ liệu header
  async header(ctx) {
    try {
      // Truy vấn tất cả các mục: Nam, Nữ, Bộ sưu tập, Unisex
      const nam = await strapi.query("api::nam.nam").findOne({
        populate: {
          danh_muc_con: {
            populate: {
              danh_muc_chi_tiet: true, // Populate danh_muc_chi_tiet trong danh_muc_con
            },
          },
          avatar: true,
          content_video: {
            populate: {
              avatar: true,
            },
          },
        },
      });

      const nu = await strapi.query("api::nu.nu").findOne({
        populate: {
          danh_muc_con: {
            populate: {
              danh_muc_chi_tiet: true,
            },
          },
          avatar: true,
          content_video: {
            populate: {
              avatar: true,
            },
          },
        },
      });

      const boSuuTap = await strapi
        .query("api::bo-suu-tap.bo-suu-tap")
        .findOne({
          populate: {
            danh_muc_con: {
              populate: {
                danh_muc_chi_tiet: true,
              },
            },
            avatar: true,
            content_video: {
              populate: {
                avatar: true,
              },
            },
          },
        });

      const unisex = await strapi.query("api::unisex.unisex").findOne({
        populate: {
          danh_muc_con: {
            populate: {
              danh_muc_chi_tiet: true,
            },
          },
          avatar: true,
          content_video: {
            populate: {
              avatar: true,
            },
          },
        },
      });

      // Trả về tất cả các dữ liệu đã populate
      return ctx.send({
        nam,
        nu,
        "bo-suu-tap": boSuuTap,
        unisex,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      return ctx.badRequest("Unable to fetch data", error);
    }
  },
};
