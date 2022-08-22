[](https://juejin.cn/post/6844904031240863758)

[](https://juejin.cn/post/6844904094281236487#heading-0)
[](https://juejin.cn/post/6844904071736852487)
#### webpack的核心概念
	·entry:入口
	·output：输出
	·loader：模块转换器，用于把模块原内容按照需求转换成新内容
	·plugin：扩展插件，在webpack构建流程中的特定实际注入扩展逻辑改变构建结果或你想要做的事情。
	
#### 手写loader
#### 手写plugin

#### html-webpack-plugin插件
	1.作用
		1.动态生成html文件并自动引入js文件
		2.静态文件无需加载js或css文件，通过设置入口文件可以将js文件自动添加进去，而且相关的css文件在js中导入
		3.同时修改生成的js文件命名规则，利用hash码命名js文件
		4.没有改动时可以让浏览器缓存内容，当有改动重新部署后可以让浏览器缓存失效
	
	2.常用参数
		1.title	
			打包生成的html文档的标题(配置该项，他并不会替换指定模版文件中的title元素的内容，除非html模版文件中使用了模版引擎语法来获取该配置项的值<%= htmlWebpackPlugin.options.title %>)
			
		2.template 模版路径
			指定你生成的文件所依赖哪一个html文件模版，模版类型可以使html，jade,ejs等
			
		3.filename 	一般是相对路径
			输出文件的文件名称，默认是index.html	,还可以为输出w文件指定目录结构(例如‘html/index.html’)
		
		4.templateContent：string｜function
			可以指定模版的内容，不能与template共存
		
		5.chunks
			允许插入到模版中的一些chunk,不配置此项默认会将entry中所有的thunk注入到模版中
			
#### clean-webpack-plugin插件
	作用：	
		主要是用来清楚重复文件，生成最新的插件
			
		const {CleanWebpackPlugin} = require('clean-webpack-plugin')
		
		Plugins:[
			new CleanWebpackPlugin()
		]
		
#### 为css添加浏览器前缀
	cnpm install postcss-preset-env
	
	
#### mini-css-extract-plugin 拆分css
	npm install -D mini-css-extract-plugin
	
	作用：把css的样式从js文件中提取到单独的css 文件中，并用mini-css-extract-plugin来打包css文件
	
#### extract-text-webpack-plugin  拆分多个css
	上面的mini-css-extract-plugin会将所有的css样式结合为一个css文件，如果想拆分为多个css文件我们需要安装extract-text-webpack-plugin插件
	
#### 打包图片、字体、媒体等文件
	file-loader就是将文件在进行一些处理后(主要是处理文件名和路径，解析文件url)，并将到输出的目录中
	
	url-loader一般与file-loader搭配使用，功能与file-loader类似，如果文件小于限制的大小，则会返回base64编码，否则使用file-loader将文件移动到输出目录中
	
#### 用babel转译js文件
	为了使我们的js代码能够兼容跟多的环境我们需要安装依赖
		npm i -D babel-loader @babel/preset-env @babel/core
		
		babel-loader只会将es6/es7/8的语法转换为es5的语法，但是对新的api不会进行转换
		
		所以我们需要借助babel-polyfills来帮助我们进行转换
		
#### 解析.vue文件
	cnpm i -D vue-loader vue-template-complier vue-style-loader
	cnpm install -save vue
	
	其中vue-loader用于解析.vue文件
	
	vue-template-compiler用于编译模版
	
#### 配置webpack-dev-server进行热更新
	
	
#### 优化webpack配置
	1.优化打包速度
		构建速度指的是我们每次翠盖代码后热更新的速度以及发布前打包文件的速度
		
		1.合理的配置mode参数与devtool参数
			mode可以设置为development production两个参数
			
			如果没有设置，webpack4将会mode的默认值设置为production
			production模式下会进行tree shaking(去除无用代码)和uglifyjs(代码压缩混淆)
			
		2.缩小文件的搜索范围(配置include exclude alias noParse extensions)
		
			·alias：当我们的代码中出现import 'vue'时，webpack会采用向上递归搜索的方式去node_modules目录下找。为了减少搜索范围我们可以直接告诉webpack去哪个路径下面查找。也就是别名alias的配置
			
			·include exclude同样配置include exclude也可以减少webpack loader的搜索转换时间。
			
			·noParse 当我们的代码中使用了import jq from 'jquery'时，webpack回去解析这个jq库是否有依赖其他的包。但是我们对类似jq这样的库，一边会认为不会引用其他的包。增加noParse属性，告诉webpack不必解析，以此增加打包速度
			
			·extensions webpack会根据extensions定义的后缀查找文件
			
		
		3.使用happyPack开启多进程loader转换
			在webpack构建过程中，实际上耗费时间大多数在loader解析转换以及代码的压缩中。日常开发中我们需要使用loader对js，css,图片，文字等文件做转换操作，并且换转的文件数据量也是非常大的。由于js单线程的特性是的这些操作不能够并发的处理文件。
			
			基本原理：
				将这部分任务分解到多个子进程中去并行处理，子进程处理完成后把结果发送到主进程中，从而减少总的构建时间。
				
		const HappyPack = require('happypack');
		const OS = require('os');
		const happyThreadPool = HappyPack.ThreadPool({size:OS.cpus().length})
		
		module.exports ={
			module:{
				rules:[{
					test:/\.js$/,
					use:[{
						loader:'happypack/loader?id=happyBabel'
					}],
					exclude:/node_modules/
				}]
			},
			plugins:[
				new HappyPack({
					id:'happyBabel',
					loaders:[
						{
							loader:'babel-loader',
							options:[
								presets:[
									['@babel/preset-env']
								],
								cacheDirectory:true,
							]
						}
					]
				],
				threadPoll:happyThreadPool
				})
			]
		}
		
		
		4.使用webpack-parallel-uglify-pulgin增强代码压缩
			const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
			
			module.exports = {
				optimization:{
					minimizer:[
						new ParallelUglifyPlugin({
							cacheDir:'.cache/',
							uglifyJS:{
								output:{
									comments:false,
									beautify:false,
								},
								compress:{
									drop_console:true,
									collapse_vars:true,
									reduce_vars:true,
								}
							}
						})
					]
				}
			}
			
		5.DllPlugin DllReferencePlugin 抽离第三方模块
			因为一些elementUi，vue不经常变化，所以我们不希望这些依赖要被集中到每一次的构建中去.
			
			// webpack.dll.config.js
			const path = require("path");
			const webpack = require("webpack");
			module.exports = {
			  // 你想要打包的模块的数组
			  entry: {
			    vendor: ['vue','element-ui'] 
			  },
			  output: {
			    path: path.resolve(__dirname, 'static/js'), // 打包后文件输出的位置
			    filename: '[name].dll.js',
			    library: '[name]_library' 
			     // 这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
			  },
			  plugins: [
			    new webpack.DllPlugin({
			      path: path.resolve(__dirname, '[name]-manifest.json'),
			      name: '[name]_library', 
			      context: __dirname
			    })
			  ]
			};
			
		6.cache-loader 配置缓存
			作用：他所做的事情很简单就是babel-loader开启cache后做的事情，将loader的编译结果写入硬盘缓存，再次构建会先比较一下，如果文件较之前的没有发生变化则会直接使用缓存。
			
			使用方法：在性能开销比较大的loader之前添加次loader即可
			
			mpdule.exports = {
				module:{
					rules:[
						{
							test:/\.ext/,
							use:[
								'cache-loader',
								...loader,
							],
							include:path.join(__dirname,'src')
						}
					]
				}
			}
			
	
	2.优化打包体积
		1.引入webpack-bundle-analyzer分析打包后的文件
			作用:将打包后的内容束展示为方便直观树状图，让我们知道所构建包中真正引入的内容
			
			const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
			
			module.exports = {
				plugins:[
					new BundleAnalyzerPlugin({
						analyzerHost:'127.0.0.1',
						analyzerPort:8889,
					})
				]
			}
			
			package.json
				"analyzer":"NODE_ENV=production npm_config_report=true npm run build"
		
		2. tree-shaking 去除代码中无用的部分
			作用：用来清除代码中无用的部分
			
			目前webpack4我们设置了mode为production的时候就已经自动开启了tree-shaking
			
			但是要想使用起生效，生成的代码必须是es6模块，不能使用其他类型的模块例如commonjs.
			
			如果使用babel的话，这里有一个小问题，因为babel的预案（preset）默认会将任何模块类型都装华为commonjs类型，这样会导致tree-shaking失效。
			
			修正方法：在.babelrc文件或在webpack.config.jsw文件中设置modules：false就好了
			
			
#### 手写webpack loader
	loader从本质上说其实就是node模块。相当于一台榨汁机将相关类型的文件代码给他。根据饿哦们设置的规则，经过他的一些列加工后还给我们加工好的果汁
		
	loader编写原则：
		1.单一原则：每个loader只做一件事
		2.链式调用：webpack会按照顺序链式调用每个loader
		3.统一原则：遵循webpack定制的设计规则和结构，输入与输出均为字符串，各个loader完全独立，即插即用
		
		
	在日产好开发中，为了方便调试我们往往会加入许多console打印。但是我们不希望在生产环境中存在打印的值。那么这里我们实现一个loader去除代码中的console。
	
	1.@bable/parser 将源代码解析成AST
	2.@babel/traverse 对AST节点进行递归遍历，生成一个便于操作，转化的path对象
	3.@babel/generator 将对AST解码生成js代码
	4.@babel/types通过该模块对具体的AST节点进行增，删，改，查
	
#### AST
	通俗来说，假设我们我们有一个文件a.js，我们对a.js里面的1000行进行一些操作处理，比如为所有的await增加try catch，以及其他的操作，但是a.js里面的代码本质上来说就是一堆字符串。那我们怎么办呢，那就是转换为带标记信息的对象方便我们进行增删改查。这个带标记的对象就是AST。
		
#### webpack的作用
	1.模块打包，可以将不同模块的文件打包整合在一起，并且保证他们之间的引用正确，执行有序。利用打包我们就可以在开发的时候根据我们自己的业务自由划分文件模块，保证项目结构的清晰和可读性。
	
	
#### 有哪些常见的loader？你用过哪些loader？
	1.raw-loader:加载文件原始内容
	2.file-loader:把文件输出到一个文件夹中，在代码中通过相对的url去引用输出的文件
	3.url-loader:与file-loader类似，区别是用户可以设置一个阀值，大于阀值会交给file-loader处理，小于阀值时返回文件base64形式的编码
	4.source-map-loader:加载额外的source map文件，以方便断点调试
	5.svg-inline-loader:将压缩后的svg内容注入到代码中
	6.image-loader:加载并压缩图片文件
	7.json-loader:加载json文件
	8.babel-loader:把es6转化为es5
	9.ts-loader:将ts转化为js
	10.awesome-typescript-loader:将ts转化为js，性能优于ts-loader
	11.sass-loader:将sass/scss转化为css
	12.css-loader:加载css，支持模块化，压缩，
	13.style-loader:把css代码注入到js中，通过dom操作去加载css
	14.postcss-loader:扩展css语法，使用下一代css，剋配合autoprefixer插件自动补齐css3的前缀
	15.eslint-loader:通过eslint检查js代码
	16.tslint-loader:通过tslint检查ts的代码
	17.vue-loader:加载vue.js单文件组件
	18.cache-loader:可以在一些性能开销比较大的loader之前添加，目的是将结果缓存到磁盘里
	
#### 有哪些常见的Plugin？你用过哪些Plugin？
	1.define-plugin：定义环境变量(webpack4之后指定mode会自动配置)
	2.ignore-plugin:忽略部分文件
	3.html-webpack-plugin:简化html文件的创建（依赖于html-loader）
	4.web-webpack-plugin:可方便的为单页应用输出html，比如html-webpack-plugin好用
	5.uglify-webpack-plugin:不支持es6压缩
	7.terser-webpack-plugin:支持压缩es6
	8.webpack-parallel-uglify-plugin:多进程执行代码压缩，提升构建速度
	9.mini-css-extract-plugin:分离样式文件，css提取为单独的文件，支持按需加载(替代extract-text-webpack-plugin)
	10.clean-webpack-plugin:目录清理
	11.webpack-bundle-analyzer:可视化webpack输出文件体积
	
#### loader和plugin的区别
	loader本质就是一个函数，在该函数中对接收的内容进行转换，返回转换后的结果。因为webpack只认识js，所以loader就成了翻译官，对其他类型的资源进行转译的预处理工作。
	
	loader在modlue.rules配置,作为模块的解析规则，类型为数组。每一项都是一个object内部含有test(类型文件)，loader,options参数等属性。
	
	
	plugin就是插件，基于事件流框架tapable，插件可以扩展webpack的功能，在webpack运行的生命周期中会广播出很多事件，plugin可以监听这些事件，在适当的时机通过webpack提供api改变输出结果。
	
	plugin在plugins中单独配置，类型为数组，每一项是一个plugins的实例，参数都通过构造函数传入。
	
#### webpack构建流程
	1.webpack的构建流程是一个串行的过程,从启动到结束依次会执行：
		1.初始化参数：从配置文件和shell语句中读取并合并参数,得出最终的参数
		2.开始编译：用上一步得到的参数初始化compiler对象，加载所有配置的插件,执行对象run方法开始执行编译
		3.确定入口：根据配置中的entry找到所有的入口文件
		4.编译模块：从入口文件出发,调用所有配置的loader对模块进行翻译，在找出该模块依赖的模块，在再递归到本步骤直到所有入口依赖的文件都
		5.完成模块编译：在经过第四步使用loader翻译完成所有模块后,得到了每个模块被翻译后的最终的内容以及他们之间的关系
		6.输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块chunk，在把每个chunk转换成一个单独的文件加入到输入列表中。这步是最后一个可以修改输出内容的机会
		7.输出完成：在确定好输出内容之后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统中
		
		
	简单的说就是：
		1.初始化：启动构建，读取与合并配置参数，加载plugins,实力化compiler。
		2.编译：从entry出发，针对每个module串行调用对应的loader去翻译文件的内容，在找到该module所依赖的module，递归进行编译处理。
		3.输出：将编译后的module组合成的chunk,将chunk转换成文件，输入到文件系统中。
		
#### 使用过哪些可以提高效率的webpack插件？
	1.webpack-dashboard:可以更友好的展示相关的打包信息
	2.webpack-merge：提取公共配置，减少重复配置代码
	3.speed-measure-webpack-plugin:建成smp,分析出webpack打包过程中的loader和plugin的耗时，有利于找到构建过程中的瓶颈
	4.size-plugin:监控资源体积变化
	5.HotModuleReplacemenrPlugin:模块热替换
	
#### source map是什么? 生产环境怎么用
	source map是将编译，打包，压缩后的代码映射回源代码的过程。打包压缩后的代码不具备良好的可读性，想要调试源码就需要source map
	
	map文件只要不打开开发者工具就不会加载。
	
	
#### 模块打包原理
	webpack实际上为每个模块创造了一个可以导入和导出的环境，本质上并没有修改代码的执行逻辑，代码的执行顺序与模块的加载顺序是一致的
	
#### 文件监听原理
	在发现源码发生变化的时候，自动重新构建新的输出文件。
	
	webpack开启监听模式有两种方式
		1.启动webpack命令，带上--watch参数
		2.在配置webpack.config.js的时候何止watch：true
		
	缺点：每次都需要手动刷新浏览器
	
	原理：轮询判断文件的最后编辑时间是否发生变化，如果某个文件发生变化并不会立即告诉监听者，而是先缓存起来等，aggregateTime后在执行
	
	module.export = {
		watch:true,  //默认为false，也就是不开启
		watchOptions:{ //只有开启监听模式watchOptions才有意义
			ignored:/node_module/,   //默认为空，不监听文件或文件夹，支持正则匹配
			aggregateTimeout:300 , //监听到变化发生后
			poll:1000, //判断文件是否发生变化是通过不断询问系统指定文件有没有变化实现的，默认每秒问1000次
		}
	}
		
		
#### webpack热更新的原理
	webpack的热更新又称作热替换（Hot Module Replacement），缩写为HMR，这个机制可以做到不用刷新浏览器而将新更改的模块替换上去。
	
	HMR的核心就是客户端从服务端拉取更新后的文件,准确的说是chunk diff，实际上WDS与浏览器之间维护了一个websocket，当本地文件发生变化的时候，WDS会向浏览器推送更新，并带上构建时的hash，让客户端与上一次进行对比，客户端对比出差异之后会向WDS发起ajax请求来获取更改的内容，这样客户端就可以借助这些信息继续向WDS发起jsonp请求获取chunk的增量更新
	
#### 如何对bundle体积进行监控和分析
	vscode中有一个插件叫做import cost可以帮助我们对引入模块的大小进行实时监测，还可以使用webpack-bundle-analyzer生成bundle的模块组成图，显示所占体积
	
	bundleSize工具包可以进行自动化资源体积监控
	
#### 文件指纹是什么？怎么用？
	文件指纹指的是打包后输出的文件名的后缀
		·hash：和整个项目的构建相关，只要项目文件有修改，整个项目构建的hash值就会更改
		·chunkhash：和webpack打包的chunk有关，不同entry会生出不同的chunkhash
		·contentHash：根据文件内容来定义hash，文件内容不变，则contentHash不变
		
		js的文件指纹设置
			module.export={
				entry:{
					app:'./src/app.js',
					search:'./src/search.js'
				},
				output:{
					filename:'[name][chunkhash:8].js',
					path:_dirname+'/dist'
				}
			}
			
		css的文件指纹设置
			module.export={
				entry:{
					app:'./src/app.js',
					search:'./src/search.js'
				},
				
				output:{
					filename:'[name][chunkhash:8].js',
					path:__dirname+'/dist'
				},
				plugins:[
					new MiniCssExtractPlugin({
						filename:'[name][chunkhash:8].css'
					})
				]
			}
	
		图片的文件指纹设置
			设置file-loader的name，使用hash
			
			占位符名称及含义
				1.ext资源后缀名
				2.name文件名称
				3.path文件的相对路径
				4.folder文件所在的文件夹
				5.contenthash文件内容的hash，默认是md5生成
				6.hash文件内容的hash，默认是md5生成的
				7.emoji一个随机的指代文件内容emoji
				
			const path = require('path');
			
			module.export = {
				entry:'./src/index.js',
				
				output:{
					filename:'bundle.js',
					path:path.join(__dirname,'dist')
				},
				
				module:{
					rules:[{
						test:/\.(png|svg|jpg|gif)$/,
						use:[{
							loader:'file-loader',
							options:{
								name:'img/[name][hash:8].[ext]'
							}
						}]
					}]
				}
			}
			
			
#### 在时机工作中，配置文件上百行乃是常事，如何保证哥哥loader按照预想的方式工作
	可以使用enforce强制执行loader的作用顺序，pre代表在所有正常loader之前执行，post是所有loader之后执行。
	
	loader默认是从下往上处理的。
	可以通过enforce属性，默认有以下几个值。
		1.pre 优先处理
		2.normal 正常处理
		3.inline 其次处理 官方不推荐使用
		4.post 最后处理
		
#### 如何优化webpack的构建速度呢？
	1.使用高版本的webpack和node.js
	2.多进程/多实例构建：thread-loader
	3.压缩代码：
		·多进程并行压缩
			·webpack-paralle-uglify-plugin多线程压缩代码（UglifyJsPlugin是单线程压缩代码）
			·uglifyjs-webpack-plugin 开启paralle参数，不支持es6
			·terser-webpack-plugin 开启paralle参数
		·通过mini-css-extract-plugin提取chunk中的css代码到单独的文件，通过xcss-loader的minimize选项开启cssnano压缩css
	
	4.图片压缩
		·使用基于node库的imagemin
		·配置image-webpack-loader(图片压缩)，不能同时与url-loader使用
		
	5.缩小打包作用域
		·exclude/include(确定loader规则范围)
		·resolve.modules指明第三方模块的绝对路径
		·resolve.extensions尽可能减少后缀尝试的可能性
		·noParse对完全不需要解析的库进行忽略
		·IgnorePlugin(完全排除模块)
		·合理使用alias
	6.提取页面公共资源
		基础包分离
			·使用html-webpack-externals-plugin,将基础包通过CDN引入，不打入bundle中
			·使用splitChunksPlugin进行（公共脚本，基础包，页面公共文件）分离，替代了commonsChunkPlugin
	7.DLL
		·使用sllPlugin进行分包，使用DllReferencePlugin对manifest.json引用，让一些基本不会改动的代码先达成静态资源，避免反复编译浪费时间。
		·hashedModulesPlugin可以解决模块数字id问题
		
	8.tree shaking
		·打包过程中监测工程中没有引用过的模块进行标记，在资源压缩时将他们从最终的bundle中去掉开发中尽可能使用es6的模块，提高tree shaking的效率
		·禁用babel-loader的模块依赖解析，否则webpack接收到的就是转换过来的commonjs形式的模块，无法进行tree-shaking
		·使用uncss去除无用的css代码
			purgecss-webpack-plugin和mini-css-extract-plugin配合使用
				
	9.scope hoisting
		·构建后的代码会存在大量的必报，造成体积增大，运行代码时创建的函数作用域变多，内存开销变大，scope hoisting将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突
		·必须是es6的语法，因为有很多的第三方库荏苒采用commonjs语法，为了充分发挥scope hoisting的作用，需要配置mainFields对第三方模块优先采用jsnext：main中指向 的es6模版语法
		
#### 你刚才也提到了代码分割，那么代码分割的本质是什么呢？有什么意义呢
	代码分割的本质就是在源代码直接上线和打包成为以校本这两种极端方案之间的更适合实际场景的中间状态
	
	用可接受的服务器性能压力增加来换取更好的用户体验
	
	源代码直接上线：虽然过程可控，但是http请求过多，性能开销大
	打包成唯一脚本：服务器压力小，但是页面空白时间长，用户体验不好
	
	
#### babel的原理
	分为三部分:
		1.解析：将代码转换成AST
			·词法分析：将代码分割成token流，即语法单元成的数组
			·语法分析：分析token流，并生成AST
			
		2.转换：访问ast的节点进行变化操作生产新的AST
		3.生成：以新的ast为基础生成代码
		
		