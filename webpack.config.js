const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = browserConfig;

const browserConfig = {
  entry: './browser/index.js', // assumes your entry point is the index.js in the root of your project folder
  output: {
    path: __dirname,
    filename: './public/bundle.js' // assumes your bundle.js will also be in the root of your project folder
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['react'] // if you aren't using 'babel-preset-es2015', then omit the 'es2015'
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: [
            {
              loader: 'css-loader',
              query: {
                localIdentName: '[hash:8]',
                modules: true,
              },
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    })
  ]
};

const serverCOnfig = {
  entry: '/src/server/index.js',
  terget: "node",
  output: {
    path: __dirname,
    filename: "server.js",
    libraryTaret: "commonjs2"
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /js$/,
        exclude:/(node_modules)/,
        loader: "babel-loader",
        query: {presets: ["react-app"]}
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: [
            {
              loader: 'css-loader',
              query: {
                localIdentName: '[hash:8]',
                modules: true,
              },
            },
          ],
        }),
      },
    ],
  },
}

