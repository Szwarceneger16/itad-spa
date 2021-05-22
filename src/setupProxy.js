const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/getTranslation/*",
    createProxyMiddleware({
      target: "http://localhost:3101",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/*",
    createProxyMiddleware({
      target: "http://localhost:3100",
      changeOrigin: true,
    })
  );
};
