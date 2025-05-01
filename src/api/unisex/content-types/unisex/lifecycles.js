const slugify = require("slugify");
module.exports = {
  async beforeUpdate(event) {
    const { data } = event.params;

    // Duyệt qua danh sách danh_muc_con để kiểm tra từng đối tượng
    if (data.danh_muc_con && Array.isArray(data.danh_muc_con)) {
      // Lặp qua mỗi phần tử trong mảng danh_muc_con
      for (const item of data.danh_muc_con) {
        // Kiểm tra item có id và sau đó thực hiện populate để lấy dữ liệu component
        if (item.id) {
          try {
            // Truy vấn và populate danh_muc_chi_tiet từ danh_muc_con
            const populatedItem = await strapi
              .query("api::unisex.unisex")
              .findOne({
                where: { id: data.id }, // Lọc theo id của nam
                populate: {
                  danh_muc_con: {
                    populate: {
                      danh_muc_chi_tiet: true, // Populate danh_muc_chi_tiet trong danh_muc_con
                    },
                  },
                },
              });

            // Kiểm tra và cập nhật slug cho danh_muc_chi_tiet
            populatedItem.danh_muc_con.forEach((conItem) => {
              if (
                conItem.danh_muc_chi_tiet &&
                Array.isArray(conItem.danh_muc_chi_tiet)
              ) {
                conItem.danh_muc_chi_tiet.forEach((chiTiet) => {
                  if (chiTiet.title) {
                    chiTiet.slug = slugify(chiTiet.title, { lower: true });
                  }
                });
              }
            });

            // Lưu lại các thay đổi vào cơ sở dữ liệu sử dụng entityService
            await strapi.entityService.update(
              "api::unisex.unisex",
              populatedItem.id,
              {
                data: {
                  danh_muc_con: populatedItem.danh_muc_con,
                },
              }
            );
          } catch (error) {
            console.error("Error populating data:", error);
          }
        }
      }
    }
  },
};
