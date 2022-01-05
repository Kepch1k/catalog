module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/catalog/" : "/",
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/scss/custom.scss";
        `,
      },
    }
  }
};
