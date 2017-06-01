const path = require("path"),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  CopyWebpackPlugin = require("copy-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "app.css",
  disable: process.env.NODE_ENV !== "production"
});

const copy = new CopyWebpackPlugin([
  {from: relative("index.html"), to: relative("out")},
  {from: relative("node_modules", "font-awesome", "fonts", "*"), to: relative("out", "fonts"), flatten: true}
]);

function relative(...ps) {
  return path.join(__dirname, ...ps);
}

module.exports = {
  entry: "./src/index.js",
  output: {
    path: relative("out"),
    filename: "app.js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        include: relative("src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2015", "react"],
            plugins: ["transform-object-rest-spread"]
          }
        }
      },
      {
        test: /\.scss$/,
        include: relative("src"),
        use: extractSass.extract({
          use: [{
            loader: "css-loader",
            options: {
              url: false
            }
          }, {
            loader: "postcss-loader"
          }, {
            loader: "sass-loader"
          }],
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [extractSass, copy]
};
