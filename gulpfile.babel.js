import path from "path";
import WebpackDevServer from "webpack-dev-server";
import gulp from "gulp";
import sass from "gulp-sass";
import webpack from "webpack";
import rimraf from "rimraf";

const isDev = process.env.NODE_ENV !== "prod";

const relative = (...xs) => path.join(__dirname, ...xs);

const paths = {
  js: {
    entry: "./index.jsx",
    outFile: "index.js",
  },
  html: {
    entry: relative("src", "index.html"),
  },
  sass: {
    entry: relative("src", "index.scss"),
    watch: relative("src", "**", "*.scss"),
  },
  srcDir: relative("src"),
  outDir: relative("out"),
};

const babelConfig = {
  exclude: "node_modules/**",
  presets: [["@babel/env", { modules: false }], "@babel/react", "@babel/flow"],
  plugins: ["@babel/proposal-object-rest-spread"],
};

const webpackConfig = {
  context: paths.srcDir,
  entry: [paths.js.entry],
  output: {
    path: paths.outDir,
    filename: paths.js.outFile,
  },
  mode: isDev ? "development" : "production",
  devtool: isDev ? "source-map" : false,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: babelConfig,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json", ".jsx"],
  },
};

const webpackDevConfig = {
  ...webpackConfig,
  plugins: [new webpack.HotModuleReplacementPlugin()],
};

const webpackDevServerConfig = {
  contentBase: paths.outDir,
  historyApiFallback: true,
  host: "localhost",
  port: 8080,
  hot: true,
  stats: {
    colors: true,
  },
};

WebpackDevServer.addDevServerEntrypoints(
  webpackDevConfig,
  webpackDevServerConfig,
);

gulp.task("clean", (cb) => rimraf(paths.outDir, cb));

gulp.task("assets.watch", () =>
  gulp.watch(paths.html.entry, gulp.parallel("assets.html")),
);

gulp.task("assets.html", () =>
  gulp.src(paths.html.entry).pipe(gulp.dest(paths.outDir)),
);

gulp.task("assets", gulp.parallel("assets.html"));

gulp.task("sass.watch", () =>
  gulp.watch(paths.sass.watch, gulp.parallel("sass.build")),
);

gulp.task("sass.build", () =>
  gulp
    .src(paths.sass.entry)
    .pipe(sass())
    .pipe(gulp.dest(paths.outDir)),
);

gulp.task("js.build", (cb) =>
  webpack(webpackConfig).run((err, stats) => {
    const s = stats.toString({ colors: true });
    if (err) {
      return cb(err);
    }
    if (stats.hasErrors() || stats.hasWarnings()) {
      return cb(s);
    }
    console.log(s); // eslint-disable-line no-console
    return cb();
  }),
);

gulp.task("js.watch", () => {
  const { host, port } = webpackDevServerConfig;
  const server = new WebpackDevServer(
    webpack(webpackDevConfig),
    webpackDevServerConfig,
  );
  server.listen(
    port,
    host,
    () => console.log(`Dev server started on http://${host}:${port}`), // eslint-disable-line no-console
  );
});

gulp.task(
  "build",
  gulp.series("clean", gulp.parallel("js.build", "sass.build", "assets")),
);

gulp.task(
  "dev",
  gulp.series("build", gulp.parallel("js.watch", "sass.watch", "assets.watch")),
);

gulp.task("default", gulp.parallel("build"));
