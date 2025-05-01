module.exports = {
  apps: [
    {
      name: "strapi-corr",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
