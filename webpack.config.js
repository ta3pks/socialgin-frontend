var debug = true; //process.env.NODE_ENV !== "production"
var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');


module.exports = {
  context: path.join(__dirname, "bundles"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./client.js",
  module: {
    loaders: [
      {
                test: /\.less$/,
                loader: "style!css!less!"
            },

            {
                test: /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      }
    ]
  },
  output: {
    path: __dirname + "/public/js/",
    filename: "client.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: false,
      warnings : false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ],
};