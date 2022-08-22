import Websocket from './socket.js';
page({
	onLaunch(){
		this.socketInit();
	},
	onShow(){
		this.linkWebsocket();
	},
	
	// 建立链接
	linkWebsocket(){
		this.webscoket.initWebSocket({
			url:this.globalData.websocketUrl,
			success(res){
				console.log(res)
			},
			fail(err){
				console.log(err);
			}
		})
	},
	
	// 创建websocket对象
	socketInit(){
		// 创建socket对象
		this.websocket = new Websocket({
			heartCheck:false,
			isReconnection:true,
		})
		
		// 监听websocket状态
		this.websocket._onSocketOpened({
			url:this.globalData.websocketUrl,
			success(res){
			 console.log(res);
			},
			fail(err){
			 console.log(err);
			}
		})
		
		// 监听网络的变化
		this.websocket.onNetworkChange({
			url:this.globalData.websocketUrl,
			success(res){
				 console.log(res);
			},
			fail(err){
			 console.log(err);
			}
		})
		
		this.websocket.onReceivedMsg(res => {
			console.log('app.js收到的服务器内容' + result.data);
		})	
	},
	
	// 向其他页面暴露当前的websocket链接
	getSocket(){
		return this.websocket
	},
	globalData:{
		websocketUrl:'你的wss链接地址'
	}
})
