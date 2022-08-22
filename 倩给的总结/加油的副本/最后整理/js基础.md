#### 如何统计一个网页中出现次数最多的三种标签
	1.querySelectorAll('*'):获取的是NodeList对象，静态集合
	2.getElementsByTagName('*'):获取的是HTMLCollection对象，动态集合
	
	为什么getElementsByTagName比querySelectorAll快？
		因为getElementsByTagName方法我们得到的是一个对象的索引，而querySelectorAll得到的是一个对象的克隆，所以当这个对象数据量非常大的时候，显然克隆这个对象需要花费的时间比较长
	
#### js垃圾回收机制
	两种方式：
		1.标记清除
			垃圾回收机制在运行时都会给存储在内存中的所有变量加上标识，接着去掉环境中的变量和被环境中的变量所引用的变量标记，在此之后在被夹伤标记的变量将被视为要准备删除的变量
		2.引用计数
			跟踪记录每个变量被引用的次数
			垃圾回收机制会清理引用次数为0 的变量
			
			引用计数存在相互大量引用会导致内存泄漏，如果出现循环引用问题也会导致内存泄漏的问题
			
#### 几种类型的dom
	document节点、element节点、Attribute节点、text节点
	
#### 在script标签中defer和async属性的区别
	defer(延迟执行)
	async(异步加载)
	
	1.当加载的脚本有多个的时候，async是无序加载的，defer是有序加载的
	2.当有defer属性时，脚本的加载和文档的加载是异步发生的，等文档解析完成脚本才开始执行
	3.当有async属性时，脚本的加载和文档的加载是异步发生的，注意的是脚本下载完成后，会停止html的解析，先执行脚本，脚本执行完成后继续执行html解析
	4.同时有async和defer属性时，执行效果与async一致
	
#### 闭包
	简单来说就是定义在一个函数内部的函数，内部函数持有外部函数的变量或参数的引用。内部函数依赖于外部函数，外部函数参数和变量不会被垃圾回收机制回收，这些变量将永远存在于内存之中
	
	好处：
		1.可以访问读取函数内部的变量，可以避免全局变量的污染
	坏处：
		容易导致内存泄漏
		
#### unshift的方法
	可以向数组的开头添加一个或者是多个元素，并返回新的长度
	直接修改原数组
	
#### encodeUrl和decodeUrl的作用是什么
	encodeUrl用于将url装换为16进制编码，decodeUrl用于将编码的url转化会正常的url
	
#### 为什么不建议在js中使用innerHTML
	通过innerHtml修改内容，每次都会刷新，因此很慢。在innerHTML中没有验证的机会，因此更容易在文档中插入错误的代码，使网页不稳定
	
#### 如何实现浏览器内多个标签页之间的通信
	1.websocket通讯
		1.建立在tcp协议之上，服务端的实现也比较容易
		2.与http协议有着良好的兼容性，默认端口是80和443,并且握手阶段采用的是http协议，因此握手时不容易屏蔽，能通过各种http代理服务器。
		3.数据格式比较轻量，性能开销比较小，通信高效
		4.可以发送文本，也可以发送二进制数据
		5.没有同源限制，客户端可以与任意服务器通信
		6.协议标识符是ws,服务器网址就是url
		
	2.定时器setInterval+cookie
		1.在页面A设置一个使用setInterval定时器不断刷新，检查cookie的值是否发生变化，如果变化就进行刷新的操作
		
	3. 使用localstorage,使用localstorage.setItem(key,value)添加内容
	window.onstorage = (e) => {console.log(e)}
	
	window.addEventListener('storage',(e) => console.log(e))
	
	4.html5浏览器的新特性sharedworker
		可以被多个window耶main使用，但是必须保证是同源的
#### js延迟加载的方法
	defer，acyns，使用setTimout，动态创建dom

#### 内存泄漏
	setTimeou,闭包，全局变量，
	
#### 异步编程
	1.回调函数
	2.promise
	3.事件监听
	
#### 在js中为啥函数被称为第一对象
	1.函数可以在运行时创建，也可以在执行过程中创建
	2.函数可以分配变量，也可以复制其引用
	3.可以作为参数传递给其他的函数
	4.函数可以有自己的方法和属性
	
#### 函数声明和函数表达式的区别
	1.函数声明存在变量提升，而函数表达式不存在变量提升
	2.解析器优先解析函数声明，使他在执行任何代码之前都能够被使用，而函数表达式要等解析器执行到他那才能解析
	
#### 如何删除一个cookie
	document.cookie = 'user=jeskson;expires='+new Date(0);
	
#### 写一下一个方法，求字符串的长度
	一个英文字符 占用一个字节，一个中文 字符占用两个字节
	function strLength(str){
		const length = 0
		
		for(let i = 0 ; i < length ; i ++){
			if(str.charCodeAt(str[i]) <= 255){
				length ++
			}else{
				length += 2
			}
		}
	}
	
#### 去除前后空格
 str.replace(/(^\s*)|(\s*)$/g,"")
 
#### Object.defineProperty方法有什么作用？有那些参数？可以通过描述对象来设置哪些特性？
	直接在对象上定义一个新的属性，或者修改一个对象的现有属性，并返回此对象
	Object.defineProperty(obj,prop,descriptor)
		obj -> 要定义属性的对象
		prop -> 要定义或修改属性的名称或者symbol
		descriptor -> 描述对象（value ---设置属性值；configurable---表示是否可删除属性，能否自改属性的特性，writable---是否是只读属性，get，set）
			
		
	返回值 -> 对象
	
#### for in可以遍历原型链上的属性吗？可以遍历不可枚举属性吗？Object.keys可以遍历到不可枚举属性吗？怎么遍历到对象的不可枚举属性？
	1.for in 可以遍历到原型链伤的属性，但是不可以遍历到不可枚举的属性
	2.Object.keys不能遍历到原型链上的属性，也不可以遍历到不可枚举属性
	Object.getOwnPropertyNames()方法访问到不可枚举属性
	
#### 说一下对Promise的理解。Promise有哪些常用的静态方法？Promise.all()方法的作用是什么？可以传入哪些类型的参数？
	1.promise是用来解决回调地狱的问题的。
	2.静态方法:Promise.all,Promise.race，Promise.resolve()，Promise.reject；
	3.Promise.all可以传入一个数组，数组中是所有promise的实例
	
#### 函数声明提升 > 变量声明提升

#### 箭头函数和普通函数的区别
	1.箭头函数不需要function关键字来声明
	2.箭头函数可以省略return
	3.箭头函数没有圆形prototype
	4.箭头函数继承当前上下文的this关键字
	
#### call、apply、bind的区别
	1.三者都可以改变this的指向，通过第一个参数来绑定
	2.三者的第一个参数如果是null或者是undefined的时候，默认指向window
	3.call第二个参数是参数列表，apply第二个参数是参数集合,bind传入的是一个参数列表（但是这个参数可以分多次传入）
	4.bind改变this指针后不会立即执行，凡是返回一个函数让我们来手动调用，apply和call则是立即调用
#### promise中的then有几个参数，then的第二个参数和catch的区别是什么？
	1.then包含有两个参数，第二个回调函数是可选的
	区别：
		1.主要区别就是then第一个函数里面抛出的异常，第二个参数是捕获不到的，但是后面的catch是可以捕获到的(或者是第二个then的第二个回调函数是可以捕获到的)
		2.且then的第二个参数和catch捕获时会采用就近原则，当两者都存在的时候，则只有then的第二个参数才能捕获到，如果then的第二个参数不存在，则catch方法才能够捕获到
	
#### Promise与async/await的区别
	1.promise是es6,async/await是es7
	2.async/await相对与promise来说，写法更加优雅
	4.reject状态
		1.promise错误可以通过.catch来获取
		2.async/await既可以使用.tehn又可以使用try/catch捕获

#### 用css实现一个三角
	.css{
		width:0;
		height:0;
		border-left:50px  solid transparent;
		border-right:50px solid transparent;
		border-bottom:50px solid red;
	}
	
#### 1rpx 等于多少px？多少物理像素？
	屏幕宽度/750
	以iphone6为例 1rpx = 375/750px = 0.5px
	1rpx是1个物理像素
	
	物理像素
		1.设备屏幕实际拥有的像素点，屏幕的基本单元
	逻辑像素
		1.也叫做设备独立像素，可以理解为反映在css/js程序里面的像素点，也就是说css像素是逻辑像素的一种
	设备像素比
		一个设备的物理像素与逻辑像素之比
		
#### get和post的区别
	1.get请求可以被缓存，post不可以被缓存
	2.get请求会保留在浏览器的记录中，但是post不会被保留在浏览器的历史记录中
	3.get请求有长度的限制，post长度的限制

	
	
	