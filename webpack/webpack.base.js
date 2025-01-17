const webpack = require("webpack");
const path = require("path");
const config = require("./config");
const _ = require("./utils");

const buildType = process.env.LINGVODOC_BUILD_TYPE ? process.env.LINGVODOC_BUILD_TYPE : "server";
const buildTypePath = `${path.join(__dirname, ".")}/buildType.${buildType}`;

module.exports = {
  entry: {
    client: ["./src/index.js"],
    vendor: [
      "./vendor/wavesurfer.myelan.js",
      "./vendor/wavesurfer.regions.js",
      "./vendor/wavesurfer.spectrogram.js",
      "./vendor/wavesurfer.timeline.js"
    ]
  },
  output: {
    path: _.outputPath,
    filename: "[name].js",
    publicPath: config.publicPath,
    clean: true
  },
  performance: {
    hints: process.env.NODE_ENV === "production" ? "warning" : false
  },
  resolve: {
    extensions: [".js"],
    alias: {
      config: `${config.srcPath}/config/${process.env.REACT_WEBPACK_ENV}`,
      buildType: buildTypePath,
      wavesurfer: require.resolve("wavesurfer.js"),
      chroma: require.resolve("chroma-js")
    },
    modules: ["src", "node_modules", "vendor"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [process.env.NODE_ENV === "development" && require.resolve("react-refresh/babel")].filter(Boolean)
          }
        },
        exclude: [/node_modules/]
      },
      {
        test: /\.(ico|jpg|png|svg|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
        type: "asset/resource"
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin(_.loadersOptions()),
    new webpack.ProvidePlugin({
      WaveSurfer: "wavesurfer.js",
      chroma: "chroma"
    })
  ],
  target: _.target
};
