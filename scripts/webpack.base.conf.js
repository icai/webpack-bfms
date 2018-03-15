'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')

const layoutMap = require('../config/layout.map')
const chunksMap = require('../config/chunks.map')
const glob = require('glob')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require('webpack')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MultipageWebpackPlugin = require('./webpack.multipage.plugin')
// const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})


// https://github.com/webpack/webpack/issues/370
// let chunks = []
const globEntries = (globPath) => {
  const entries = {}
  glob.sync(globPath, {root: path.resolve(__dirname, '../')}).forEach(path => {
    const chunk = path.split('./src/pages/')[1].split(/\/app\.js/)[0]
    entries[chunk] = path
  })
  return entries
}

// entries.axios = ['axios'];
// entries.jquery = ['jquery'];

module.exports = {
  context: path.resolve(__dirname, '../'),
  // entry: {
  //   app: './src/main.js'
  // },
  entry: globEntries('./src/pages/**/app.@(js)'),
  output: {
    path: config.build.assetsRoot,
    filename: 'assets/js/[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      src: resolve('src'),
      static: resolve('static'),
      assets: resolve('src/assets'),
      packages: resolve('packages'),
      mini: resolve('packages/mini'),
      vuo: resolve('src/base/vue'),
      components: resolve('src/components'),
      root: resolve('node_modules'),
      ajax: resolve('src/base/axios')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
        options: {
            plugins: [
                // ['import', [{ libraryName: 'antd', style: true }]],  // import less
                // 'react-hot-loader/babel'
            ],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
      // see https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md
      ,{
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            root: resolve('src'),
            attrs: ['img:src', 'link:href']
          }
        }]
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}


module.exports.plugins = [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  })
  // @todo Separate vue react framework CommonsChunkPlugin
  // new webpack.optimize.ModuleConcatenationPlugin(),
];


// chunksMap.forEach((chunk) => {
//   let chunkConf = new CommonsChunkPlugin({
//     name: chunk.name,
//     chunks: chunk.chunks,
//     minChunks: chunk.chunks.length
//   })
//   module.exports.plugins.push(new CommonsChunkPlugin(chunkConf))
// })


// https://github.com/jantimon/html-webpack-plugin
//
// config template map
// https://github.com/jaketrent/html-webpack-template
// https://www.npmjs.com/search?q=%20html-webpack-plugin&page=1&ranking=optimal
// https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md

if (process.env.NODE_ENV === 'production') {

  const htmlConf = {
    htmlTemplatePath: function (entryKey) {
      return layoutMap[entryKey] ||'./layout/miniui.tpl'
    },
    templateFilename: '[name].html',
    templatePath: './',
    htmlWebpackPluginOptions: {
      inject: true,
      templateChunks: false,
      favicon: './src/assets/img/logo.png',
      hash: process.env.NODE_ENV === 'production',
      // chunks: ['manifest', 'lib', 'vendor' , chunk],
      // chunksSortMode: 'dependency',
      appMountId: 'app',
      googleAnalytics: {
        trackingId: 'UA-XXXX-XX',
        pageViewOnLoad: true
      }
    }
  }
  module.exports.plugins.push(new MultipageWebpackPlugin(htmlConf))

} else {
  const htmlConf = {
    htmlTemplatePath: function (entryKey) {
      return layoutMap[entryKey] ||'./layout/miniui.tpl'
    },
    templateFilename: '[name].html',
    templatePath: './',
    htmlWebpackPluginOptions: {
      inject: true,
      templateChunks: false,
      favicon: './src/assets/img/logo.png',
      hash: process.env.NODE_ENV === 'production',
      // chunks: ['manifest', 'lib', 'vendor' , chunk],
      // chunksSortMode: 'dependency',
      appMountId: 'app',
      googleAnalytics: {
        trackingId: 'UA-XXXX-XX',
        pageViewOnLoad: true
      }
    }
  }

  module.exports.plugins.push(new MultipageWebpackPlugin(htmlConf))
  // module.exports.plugins.push(new HtmlWebpackInlineSourcePlugin())
}


