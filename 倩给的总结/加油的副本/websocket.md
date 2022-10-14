#### websocket，setTimeout ，setInterval
	setInterval会每隔10秒发送一次请求，可能会导致数据到达的先后顺序不一致
	
	setTimeout是接口数据返回后每隔10秒发起第二次请求，一次类推的话，这样无发保证两次请求之后的时间间隔是10秒
	
	缺点：
		程序在每次请求时都会建立新的http请求，然而并不是每次请求都会返回需要的数据，同时发送的请求达到一定数量时，会对服务器造成比较大的伤害
		
	长链接/长轮询的定义
		客户端发送一个request后，服务端拿到这个链接，如果有消息才返回response给客户端。没有消息的话就一直不返回response。
		
	http协议的特点
		服务器不能主动联系客户端，只能由客户端发起。它的被动性预示了在完成双向通信时需要不停的链接或链接一直打开，这就需要服务器端快速的处理速度或高并发的能力，是非常消耗资源的。
		
	什么是websocket？
		websocket是H5的一个新协议，它允许服务端向客户端传递信息，实现浏览器和客户端的双向通信
		
	websocket的特点
		服务器可以主动向客户端推送消息，客户端也可以主动向服务器发送消息，是真正的双向通信。
		
		·与http协议有良好的兼容性，端口默认是80和43，并且握手阶段采用http协议，因此握手时不容易屏蔽，能通过各种http代理服务器
		·建立在tcp协议基础之上，和http协议同属应用层
		·数据格式比较轻量，性能开销小，通信高效
		·可以发送文本，也可以发送二进制数组
		·没有同源限制，客户端可以与任意服务器通信
		·协议标识符是ws(如果是加密的话就是wss)，服务器网址就是url，如ws://localhost:8023
		
#### 跨平台的websocket通信库socket.io
	跨平台的webSocket通信库，具有前后端一致的api，可以触发和相应自定义的事件。
	socket.io最核心的两个api就是emit和on来，服务端和客户端都有这两个api。通过emit和on可以实现服务器和客户端之间的双向通信
	
	·emit：发送一个事件，第一个参数为事件名，第二个为要发送的数据，第三个参数为回调函数（如需对方接收到信息之后立即得到确认时，则需要用到回调函数）
	·on：监听emit发送的事件，第一个参数为要监听的事件名，第二个参数为回调函数，用来接收对方发来的数据，该函数的第一个参数为接收的数据
	
	服务端
		var app = require('express')();
		var http = require('http');
		var soketio = require('socket.io')
		const server = http.createServer(app);
		const io = socketio(server)
		var count = 0;
		<!-- websocket链接服务器 -->
		io.on('connection',(socket) => {
			<!-- 所有事件触发相应都写在这里 -->
			setInterval(() => {
				count++;
				<!-- 向建立该链接的客户端发送消息 -->
				socket.emit('mynameEv',{name:'哈哈哈哈' + count})
			},1000)
			
			<!-- 监听客户端发送消息 -->
			socket.on('yournameEv',function(data){
				console.log(data);
			})
		})
		
		app.get('/',function(req,res){
			res.sendfile(__dirname + '/index.html')
		})
		
		<!-- 启用3000的端口 -->
		server.listen(3000)
		
	客户端
		new WebSocket('ws://localhost:8080');
		
#### http和websocket的区别
	·http协议是短链接，因为请求之后，就会关闭链接，下次请求需要重新建立链接。
	·websocket是长链接，只需要通过一次请求来初始化链接，然后所有请求和响应都是通过tcp链接进行通信的。
	
#### 全双工通信协议的概念
	全双工是通信传输的一个术语，通信允许数据在两个方向上同时传输，他在能力上相当于两个单工通信方式的结合。全双工指可以进行信号的双向传输
	
	·全双工：例如我们可以使用的手机就是全双工，在同一时刻两个用户可以同时给对方传送数据
	·半双工：例如我们使用的对讲机，当A方按住通话按钮才可以向b方传送数据，b方也是，在同一时刻只有一个用户能够传送数据
	·单工：例如我们看电视时，我们只能接受对方发送的信息，不能够给对方传递信息。
	
#### websocket和socket的区别
	socket是应用层与TCP/IP协议通信的中间软件抽象层，他是一组接口，而websocket协议是一个完整的应用层协议，拥有一套完整的API
	
#### 服务端实时通信有哪些方法
	1.ajax轮询(短轮询)
	2.long polling长轮询
	3.websocket
	
#### websocket的应用场景
	1.社交订阅 2.多玩家游戏 3.协同编辑文档 4.数据流状态 5.多人聊天
	
#### 
	