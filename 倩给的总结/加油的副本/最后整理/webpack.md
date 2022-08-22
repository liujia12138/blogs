#### webpack 的构建流程是什么
	1.初始化参数：解析webpack配置参数，合并shell传入和webpack.config.js文件配置的参数,形成最后的配置结果；
	2.开始编译：上一步得到的参数初始化compiler对象，注册所有配置的插件，插件 监听webpack构建生命周期的事件节点，做出相应的反应，执行对象的run方法开始执行编译；
	3.确定入口：从配置的entry入口，开始解析文件构建AST语法树，找出依赖，递归下去；
	4.编译模块：递归中根据文件类型和loader配置，调用所有配置的loader对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
	5.完成模块编译并输出：递归完事后，得到每个文件结果，包含每个模块以及他们之间的依赖关系，根据entry或分包配置生成代码块chunk;
	6.输出完成：输出所有的chunk到文件系统；
	
#### webpack 的热更新原理
	1.webpack-dev-server/client端会监听到此hash消息
	2.客户端收到ok消息后会执行reloadApp方法进行更新
	3.在reloadApp中会进行判断，是否支持热更新，如果支持的话发生 webpackHotUpdate事件，如果不支持就直接刷新浏览器
	4.在 webpack/hot/dev-server.js 会监听 webpackHotUpdate 事件
	5.在check方法里会调用module.hot.check方法
	6.HotModuleReplacement.runtime请求Manifest
	通过调用 JsonpMainTemplate.runtime 的 hotDownloadManifest方法
	调用JsonpMainTemplate.runtime的hotDownloadUpdateChunk方法通过JSONP请求获取最新的模块代码
	补丁js取回来或会调用 JsonpMainTemplate.runtime.js 的 webpackHotUpdate 方法
	然后会调用 HotModuleReplacement.runtime.js 的 hotAddUpdateChunk方法动态更新 模块代码
	然后调用hotApply方法进行热更
	
####  webpack 常见的plugin有哪些
	ProvidePlugin：自动加载模块，代替require和import
	html-webpack-plugin可以根据模板自动生成html代码，并自动引用css和js文件
	extract-text-webpack-plugin 将js文件中引用的样式单独抽离成css文件
	DefinePlugin 编译时配置全局变量，这对开发模式和发布模式的构建允许不同的行为非常有用。
	HotModuleReplacementPlugin 热更新
	optimize-css-assets-webpack-plugin 不同组件中重复的css可以快速去重
	webpack-bundle-analyzer 一个webpack的bundle文件分析工具，将bundle文件以可交互缩放的treemap的形式展示。
	compression-webpack-plugin 生产环境可采用gzip压缩JS和CSS
	happypack：通过多进程模型，来加速代码构建
	clean-wenpack-plugin 清理每次打包下没有使用的文件
	