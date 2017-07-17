const webpack = require('webpack');
const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = (envOptions = {MODE : "local"}) =>{

  let plugins = [

    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      __dirname
    ),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]

  if(envOptions.MODE === "production"){

    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
            screw_ie8: true,
            keep_fnames: true
        },
        compress: {
            warnings: false,
            screw_ie8: true
        },
        comments: false
      })
    )

    plugins.push(
      new CompressionPlugin({
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.js$|\.html$/,
          threshold: 10240,
          minRatio: 0.8
      })
    )
  }

  return {
    context: __dirname + '/front',
    entry : __dirname + '/front/main.ts',
    output : {
      path: __dirname + '/public/js',
      filename : 'cms.bundle.js'
    },
    resolve: {
      extensions: ['.js','.ts', '.tsx','.html','.css','.ejs']
    },
    module: {
      rules: [
        {
          test: /\.ejs$/,
          loader: ['ejs-compiled-loader?title=sarasa']
        },
        {
          test: /\.ts$/,
          loader: ['ts-loader','angular2-template-loader?keepUrl=true'],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        /* Embed files. */
        {
          test: /\.(html|css)$/,
          loader: 'raw-loader',
          exclude: /(\.async|index)\.(html|css)$/
        }
      ]
    },
    plugins: plugins
  };

};
