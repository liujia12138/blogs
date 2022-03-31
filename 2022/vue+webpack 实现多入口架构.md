#### 一、为什么需要多入口多页面项目？

vue 项目大多是单页面项目，即一个 main.js 入口文件，一般情况下使用 webpack 默认配置就可以。但是如果项目很大，有很多个小的分项目，比如一个数据处理平台需要包含数据接入、数据处理、数据输出等分项目，这时把这几个分项目合并到一个项目中管理会方便很多。

#### 二、多页面可以解决哪些问题？

- 独立维护子系统的权限和缓存数据
- 开发一个子系统时，不需要启动另外一个系统
- 热更新一个子系统时，不需要编译所有系统

#### 三、怎样配置一个 vue 多页面应用

##### 1.先创建一个 vue 项目

```
vue init webpack project-name
```

##### 2.给每个子系统创建 main.js、App.vue、index.html 文件，最终目录结构如下

```
├─build
├─config
├─node_modules
├─src
|  ├─api
|  ├─assets
|  ├─components
|  ├─layout
|  ├─pages
|  |  ├─system1
|  |  | ├─views
|  |  | ├─store
|  |  | ├─router
|  |  |  main.js
|  |  |  index.html
|  |  ├─system2
|  |  | ├─views
|  |  | ├─store
|  |  | ├─router
|  |  |  main.js
|  |  |  index.html
|    ...

```

##### 3.修改 webpack 配置文件

基础配置 webpack.base.conf.js

```js
const glob = require('glob')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const entrys = {} //入口文件配置
const pageDir = resolve('src/pages')

const pages = glob.sync('*/index.html', { cwd: pageDir }).map((p) => {
  const name = p.split('/')[0]
  entrys[name] = `${pageDir}/${name}/main.js`
  return new HtmlWebpackPlugin({
    filename: `${name}.html`,
    template: pageDir + '/' + p,
    chunks: ['manifest', 'vendor', 'app', name],
    inject: true,
    favicon: './static/favicon.ico',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
    chunksSortMode: 'dependency'
  })
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: entrys,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  plugins: [...pages]
  // 其他。。。。
}
```

开发环境配置 webpack.dev.conf.js，HtmlWebpackPlugin 已经在基础配置中修改，dev 环境不需要再修改

生产环境配置 webpack.prod.conf.js，修改output

```js
modules.exports = {
  // ....
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
    publicPath: '/'
  },
  plugins: [
    // 公共模块单独打包
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3,
      maxChunks: 10
    })
  ]
}
```

##### 4.运行项目
```
npm run dev
```
http://localhost:8080/system1.html#/home  就可以访问啦
##### 5.打包
```
npm run build
```
打包结果
```
dist
├─system1.html
├─system2.html
├─static
| ├─css
| ├─js
| ├─fonts
| ├─img
| ├─static
└ ├─js
```

#### 四、后续优化
1.单独构建、打包某个子系统
2.子系统特有依赖模块打包策略
