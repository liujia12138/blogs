### 1. 路由懒加载和分模块打包

import()+ webpackChunkName

### 2. 开启 Gzip 压缩

安装 CompressionWebpackPlugin，`npm i compression-webpack-plugin --save-dev`
在 vue.config.js 中配置

```js
module.exports = {
  // ....
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      const CompressionWebpackPlugin = require('compression-webpack-plugin')
      const productionGzipExtensions = ['html', 'js', 'css']
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          // 文件大小超过1k才会被压缩
          threshold: 1024,
          minRatio: 0.99,
          // 删除源文件
          deleteOriginAssets: true
        })
      )
    }
  }
}
```

### 3. icon 图片转 base64

使用 file-loader 和 url-loader

```js
 {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: "url-loader",
    exclude: [resolve("src/assets/icons")],
    options: {
      limit: 10000,
      name: utils.assetsPath("img/[name].[hash:7].[ext]")
    }
  }
```

### 4. 使用 cdn

（选配，CDN 虽然速度快，但是没有本地打包稳定）

```
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';

// 本地环境是否需要使用cdn
const devNeedCdn = false

// cdn链接
const cdn = {
    // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
    externals: {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        'marked': 'marked',
        'highlight.js': 'hljs',
        'nprogress': 'NProgress',
        'axios': 'axios'
    },
    // cdn的css链接
    css: [
        'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'
    ],
    // cdn的js链接
    js: [
        'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
        'https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js',
        'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
        'https://cdn.bootcss.com/marked/0.8.0/marked.min.js',
        'https://cdn.bootcss.com/highlight.js/9.18.1/highlight.min.js',
        'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js',
        'https://cdn.bootcss.com/axios/0.19.2/axios.min.js'
    ]
}

module.exports = {
    chainWebpack: config => {
        // ============注入cdn start============
        config.plugin('html').tap(args => {
            // 生产环境或本地需要cdn时，才注入cdn
            if (isProduction || devNeedCdn) args[0].cdn = cdn
            return args
        })
        // ============注入cdn start============
    },
    configureWebpack: config => {
        // 用cdn方式引入，则构建时要忽略相关资源
        if (isProduction || devNeedCdn) config.externals = cdn.externals
    }
}
```

html 中引入 CDN

```html
<!-- 使用CDN的CSS文件 -->
<% for (var i in htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.css) { %>
<link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="stylesheet" />
<% } %>
<!-- 使用CDN的CSS文件 -->

<!-- 使用cdn的js文件 -->
<% for (var i in htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.js) { %>
<script src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"></script>
<% } %>
<!-- 使用CDN的js文件 -->
```

### 5. 压缩 js 代码

使用 UglifyjsWebpackPlugin 插件

1. 安装``` npm i uglifyjs-webpack-plugin --save-dev ````
2. 在 vue.config.js 中引入

```js
module.exports = {
  configureWebpack: (config) => {
    const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
    config.plugins.push(
      new UglifyjsWebpackPlugin({
        uglifyOptions: {
          // 生产环境自动删除console
          compress: {
            drop_debugger: true,
            drop_console: true,
            pure_funcs: ['console.log']
          }
        },
        sourceMap: false,
        parallel: true
      })
    )
  }
}
```
