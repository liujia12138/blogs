## HTML

### HTML5

- HTML5 有哪些更新？

  - 1.  语义化标签 header、nav、aside、section、article、footer
  - 2.  媒体标签 video、audio、source

    - audio 音频

		属性：
		controls 控制面板
		autoplay 自动播放
		loop 是否循环播放 
		
		- video 视频

		属性：
		poster 默认显示的第一针画面
		controls 控制面板
		width/height 宽高 - source 标签，因为浏览器对视频格式支持程度不一样，为了能够兼容不同的浏览器，可以通过 source 来指定视频源

		```html
		<video>
			<source src='aa.flv' type='video/flv'></source>
			<source src='aa.mp4' type='video/mp4'></source>
		</video>
		```

  - 3.表单
		- 表单类型：
			email：能够验证当前输入的邮箱地址是否合法
			url：验证 URL
			number：只能输入数字，其他输入不了，而且自带上下增大减小箭头，可以设置最大最小值
			search：输入框会给提供一个小叉，可以删除输入的内容，更加人性化
			range：可以提供给一个范围，其中可以设置 max 和 min 值
			color：颜色拾取器
			time：时分秒
			date：日期选择器，年月日
			datetime：日期和时间
			week：周选择器
			month：月份选择器 - 表单属性：
			placeholder：提示信息
			autofocus：自动获取焦点
			autocomplete：自动补全，但是前提是表单必须提交过且必须有 name 属性
			required：是否必填
			pattern：正则校验
			multiple：是否可以选择多个 - 表单事件：
			oninput：输入框输入时触发
			oninvalid：验证不通过时触发

	- 4. 进度条、度量器

		- progress标签：用来表示任务的进度，max用来表示任务的总进度，value表示已完成多少。注意ie和safari不支持
		- meter属性：用来显示剩余容量或者剩余库存

	- 5. DOM查询操作

		- document.querySelector()

		document.querySelectorAll()

	- 6. web存储localStorage、sessionStorage

		- localStorage - 没有时间限制的数据存储
		- sessionStorage - 针对一个 session 的数据存储，会话缓存

	- 7. 其他

		- 拖拽
		- canvas
		- svg

		- 可缩放的矢量图形，使用XML格式定义的图形，放大时不会失真

		- 地理定位 Geolocation
		- history

### 对 HTML 语义化的理解

- 语义化，是指根据内容的结构化（内容语义化），选择合适的标签（代码语义化），即用正确的标签做正确的事。

语义化的优点：1.对机器友好，更适合搜索引擎爬取有效信息，有利于 SEO；支持读屏软件根据文章自动生成目录。2.对开发者友好，增强了标签的可读性，结构更加清晰，便于团队的开发和维护。

常见的语义化标签：

<header>头部</header>、<nav>导航栏</nav>、<section>区块</section>、<main>主要区域</main>、<article>主要内容</article>、<aside>侧边栏</aside>、<footer>底部</footer>

### iframe 有哪些优缺点？

- iframe 元素会创建包含另外一个文档的内联框架。
  优点： 1.用来加载速度较慢的内容，如广告 2.可以使脚本并行下载 3.可以实现跨子域通信，使用 postMessage 发送消息，document.addEventListener('message')
  缺点：

1. iframe 会阻塞主页面的 onload 事件 2.无法被一些搜索引擎识别 3.不容易管理

### WebWorker 是什么？

- 在 HTML 页面中，在执行脚本时页面是不可响应的，直到脚本执行完毕后，页面才变成可响应的。web worker 是运行在后台的 js，独立于其他脚本，不会影响页面性能，并且通过 postMessage 将结果传回主线程，这样在进行复杂操作时，就不会阻塞主线程了。
- 如何使用 WebWorker？

### HTML5 的离线存储？？？

### svg 和 canvas 的区别？

- SVG，可缩放的矢量图形（Scalable Vector Graphics），是基于可扩展标记语言 XML 描述的 2D 图形的语言，SVG DOM 中的每个元素都是可用的，可以为这个元素附加 JavaScript 事件处理。
  SVG 的特点：1. 不支持分辨率；2. 支持事件处理器；3. 适合带有大型渲染区域的应用程序；4. 复杂度高会影响渲染速度；5. 不适合游戏应用

Canvas，通过 JavaScript 来绘制图形的画布，是逐像素进行渲染的。
Canvas 的特点：1. 依赖分辨率；2. 不支持事件处理器；3. 弱的文本渲染能力；4. 能够以.png 或.jpg 的格式保存结果图像；5. 适合图像密集型游戏

### HTML5 的 drag API

- dragstart：开始拖拽时触发
  drag：正在拖拽时触发
  dragenter：在被拖拽元素进入某元素时触发，事件主体是目标元素
  dragover：被拖拽的元素 在某元素内移动时触发，事件主体是目标元素
  dragleave：被拖拽的元素 移出某元素时触发，事件主体是目标元素
  drop：目标元素完全接受拖放元素时触发
  dragend：整个拖拽操作结束时触发，事件主体是被拖拽的元素

### 常见的 meta 标签属性和作用

### 文档声明 Doctype 和<!Doctype html>有什么作用？严格模式和混杂模式有什么区别？

- 文档声明，是为了告诉浏览器，当前 HTML 文档使用什么版本的 HTML 来写，这样浏览器才能按照声明的版本来正确解析文档。
<!Doctype html>的作用就是让浏览器进入严格模式，使用最新的HTML标准来解析渲染页面，如果不写就会进入混杂模式，我们需要避免此类情况的发生。

什么是严格模式和混杂模式？
严格模式，又称为标准模式，指浏览器按照 W3C 的标准来解析代码。
混杂模式，又称怪异模式、兼容模式，是指浏览器用自己的方式解析代码，混杂模式通常模拟老式浏览器的行为，以防止老站点无法工作。

### 渐进增强和优雅降级？

- 渐进增强：主要是针对低版本的浏览器进行页面重构，在保证基本功能的情况下，再针对高级浏览器进行效果、交互等方面的改进和追加，以达到更好的用户体验。
  优雅降级：一开始就构建完整的功能，从最复杂的现状开始，然后再针对低版本的浏览器进行兼容。

### 怎么做好 seo

### src 和 href 的区别？

- src 是引入外部资源下载到文档，会暂停其他资源的下载，所以一般会将 js 脚本放到页面底部
  href 是链接外部资源，指向外部资源所在的位置，不会暂停其他资源的下载，不会停止对当前文档的处理。
