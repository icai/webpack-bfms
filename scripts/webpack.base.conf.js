'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const layoutMap = require('../config/layout.map')
const glob = require('glob')
const vueLoaderConfig = require('./vue-loader.conf')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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

const entries = {}
const chunks = {}
chunks.vue = [];
chunks.react = [];
// vue use js,
// react use jsx
glob.sync('./src/pages/**/app.@(js|jsx)', {root: path.resolve(__dirname, '../')}).forEach(path => {
  const chunk = path.split('./src/pages/')[1].split(/\/app\.jsx?/)[0]
  entries[chunk] = path
  if(path.endsWith('js')) {
    chunks.vue.push(chunk)
  } else if(path.endsWith('jsx')) {
    chunks.react.push(chunk)
  }
})

entries.lib = ['axios'];

module.exports = {
  context: path.resolve(__dirname, '../'),
  // entry: {
  //   app: './src/main.js'
  // },
  entry: entries,
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
      assets: resolve('src/assets'),
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
  // @todo Separate vue react framework CommonsChunkPlugin
  // new webpack.optimize.ModuleConcatenationPlugin(),
  new CommonsChunkPlugin({
    name: 'vendor-vue',
    chunks: chunks.vue,
    minChunks: chunks.vue.length
  }),
  new CommonsChunkPlugin({
    name: 'vendor-react',
    chunks: chunks.react,
    minChunks: chunks.react.length
  })
];



// https://github.com/jantimon/html-webpack-plugin
//
// config template map
// https://github.com/jaketrent/html-webpack-template
// https://www.npmjs.com/search?q=%20html-webpack-plugin&page=1&ranking=optimal
// https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md


if (process.env.NODE_ENV === 'production') {
  for(let ch in chunks){
    chunks[ch].forEach((chunk) => {
      const filename = chunk + '.html'
      const htmlConf = {
        // inlineSource: utils.escapeStringRegexp(chunk) + '.(js|css)$',
        filename: filename,
        title: chunk,
        template: layoutMap[chunk] ||'./layout/layout.tpl',
        inject: true,
        templateChunks: false,
        favicon: './src/assets/img/logo.png',
        hash: process.env.NODE_ENV === 'production',
        chunks: ['manifest', 'lib','vendor-' + ch , chunk],
        chunksSortMode: 'dependency',
        appMountId: 'app',
        googleAnalytics: {
          trackingId: 'UA-XXXX-XX',
          pageViewOnLoad: true
        }
      }
      module.exports.plugins.push(new HtmlWebpackPlugin(htmlConf))
    })
  }
  // module.exports.plugins.push(new HtmlWebpackInlineSourcePlugin())
} else {
  for(let ch in chunks){
    chunks[ch].forEach((chunk) => {
      const filename = chunk + '.html'
      const htmlConf = {
        filename: filename,
        // inlineSource: utils.escapeStringRegexp(chunk) + '.(js|css)$',
        title: chunk,
        template: layoutMap[chunk] ||'./layout/layout.tpl',
        inject: true,
        templateChunks: false,
        favicon: './src/assets/img/logo.png',
        hash: process.env.NODE_ENV === 'production',
        chunks: ['lib', 'vendor-' + ch , chunk],
        chunksSortMode: 'dependency',
        appMountId: 'app',
        googleAnalytics: {
          trackingId: 'UA-XXXX-XX',
          pageViewOnLoad: true
        }
      }
      module.exports.plugins.push(new HtmlWebpackPlugin(htmlConf))
    })
  }
  // module.exports.plugins.push(new HtmlWebpackInlineSourcePlugin())
}


