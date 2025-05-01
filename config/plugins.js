module.exports = {
  "strapi-google-auth-with-token": {
    enabled: true,
  },
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        "san-pham": {
          field: "slug",
          references: "title",
        },
        "danh-muc-trang-chu": {
          field: "slug",
          references: "title",
        },
        blog: {
          field: "slug",
          references: "title",
        },
      },
    },
  },
};
