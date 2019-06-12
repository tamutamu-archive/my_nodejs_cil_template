const webpack = require('webpack');

module.exports = {

  mode: "production",

  entry: "./src/main.js",

  target: 'node',

  output: {
    path: `${__dirname}/dist`,
    filename: "main.js"
  },

  module: {

    rules: [

      {
        test: /\.js$/,

        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env"
              ]
            }
          }
        ]

      }

    ]
  },
  resolve: {
    extensions: [ '.js' ]
  },
  plugins: [
    new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true })
  ]
};
