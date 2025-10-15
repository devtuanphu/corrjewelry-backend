"use strict";
const { Server } = require("socket.io");
module.exports = {
  async bootstrap({ strapi }) {
    const httpServer = strapi.server.httpServer;
    const io = new Server(httpServer, {
      cors: {
        origin: "*", // Đảm bảo frontend có thể kết nối
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });
    // Truy vấn dữ liệu từ single type countdown
    let countdown = await strapi.db.query("api::countdown.countdown").findOne();

    if (countdown) {
      let remainingTime = countdown.time || 600000; // Nếu không có time, mặc định là 600000 giây (10 giờ)

      // Kiểm tra nếu không có giá trị defaultTim, lưu giá trị ban đầu vào defaultTim
      if (!countdown.defaultTim) {
        await strapi.db.query("api::countdown.countdown").update({
          where: { id: countdown.id },
          data: { defaultTim: remainingTime },
        });
      }

      // Hàm giảm time mỗi giây
      setInterval(async () => {
        try {
          if (remainingTime > 0) {
            remainingTime -= 1; // Giảm time mỗi giây

            // Cập nhật lại giá trị time trong cơ sở dữ liệu
            await strapi.db.query("api::countdown.countdown").update({
              where: { id: countdown.id },
              data: { time: remainingTime },
            });
            io.emit("countdown", remainingTime);
          } else {
            // Khi time bằng 0, reset lại giá trị time từ defaultTim
            countdown = await strapi.db
              .query("api::countdown.countdown")
              .findOne();

            if (countdown) {
              remainingTime = countdown.defaultTim || 600000; // Lấy giá trị mới nhất từ Strapi
              console.log("Countdown reset to", remainingTime, "seconds");

              // Cập nhật lại giá trị time về giá trị ban đầu
              await strapi.db.query("api::countdown.countdown").update({
                where: { id: countdown.id },
                data: { time: remainingTime },
              });
            }
          }
        } catch (error) {
          console.error("Error updating countdown:", error);
        }
      }, 1000); // Giảm time mỗi giây
    } else {
      console.log("Countdown not found");
    }
  },
};
