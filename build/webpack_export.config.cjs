module.exports = {
  entry: {
    "export/c3runtime/main": "../template/main.js",
    "export/editor": "../template/editor.js",
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/../dist",
  },
  optimization: {
    // minimize: false,
  },
  stats: "verbose",
  // mode: "development",
};
