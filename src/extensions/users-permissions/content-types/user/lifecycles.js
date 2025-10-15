const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");

module.exports = {
  async afterCreate(event) {
    const { result, params } = event;
    const token = process.env.TOKEN_BOT_USER;
    const chatId = process.env.CHATID_GROUP_USER;
    const bot = new TelegramBot(token, { polling: true });
    console.log(params);

    const message = `🎉 Thông tin người dùng mới:
      👤 Họ và tên: ${params.data.firstName} ${params.data.lastName}
      📧 Email: ${params.data.email}
      🔑 Username: ${params.data.username}
      📞 Điện thoại: ${params.data.phone || "Không có số điện thoại"}
      🛑 Trạng thái: ${params.data.blocked ? "Đã bị khóa" : "Đang hoạt động"}
      ✔️ Xác nhận tài khoản: ${
        params.data.confirmed ? "Đã xác nhận" : "Chưa xác nhận"
      }
    `;
    try {
      await bot.sendMessage(chatId, message);
      console.log("Đơn hàng đã được gửi đến Telegram");
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn đến Telegram:", error);
    }
    if (result.provider === "google") {
      console.log("Đăng nhập với Google");
      console.log(result);

      const code = result.providerInfo.code; // Lấy code từ providerInfo

      if (!code) {
        console.error("Không có mã xác thực 'code' trong URL callback");
        return;
      }

      const clientId = process.env.GOOGLE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
      const redirectUri = "http://localhost:1337/api/auth/google/callback";

      try {
        // Trao đổi code lấy access_token
        const tokenResponse = await axios.post(
          "https://oauth2.googleapis.com/token",
          null,
          {
            params: {
              code: code,
              client_id: clientId,
              client_secret: clientSecret,
              redirect_uri: redirectUri,
              grant_type: "authorization_code",
            },
          }
        );

        const accessToken = tokenResponse.data.access_token;

        // Gọi Google People API để lấy thông tin người dùng chi tiết
        const response = await axios.get(
          "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const googleProfile = response.data;

        const givenName = googleProfile.names
          ? googleProfile.names[0].givenName
          : "";
        const familyName = googleProfile.names
          ? googleProfile.names[0].familyName
          : "";

        result.name = givenName;
        result.surname = familyName;
        result.email = googleProfile.emailAddresses
          ? googleProfile.emailAddresses[0].value
          : "";
        result.avatar = googleProfile.photos ? googleProfile.photos[0].url : "";

        await strapi
          .query("user", "users-permissions")
          .update({ id: result.id }, result);

        console.log("Thông tin người dùng đã được cập nhật: ", result);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin từ Google People API:", error);
      }
    }
  },
};
