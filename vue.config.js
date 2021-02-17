module.exports = {
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: ["./node_modules"]
        }
      }
    }
  },
  runtimeCompiler: true,
  publicPath: ""
};
