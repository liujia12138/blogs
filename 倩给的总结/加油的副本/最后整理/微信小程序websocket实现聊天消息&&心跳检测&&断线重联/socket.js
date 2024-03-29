export default class Websocket{
	constructor({heartCheck,isReconnection}){
		// 是否链接
		this._isLogin = false;
		// 当前网络状态
		this._netWork = true;
		// 是否人为退出
		this._isClosed = false;
		// 心跳检测频率
		this._timeout = 1000;
		this._timeoutObj = null;
		// 当前重连次数
		this._connectNum = 0;
		// 心跳检测和断线重连开关，true为启用，false为关闭
		this._heartCheck = heartCheck;
		this._isReconnection = isReconnection;
		this._onSocketOpened();
		this.wsUrl = ""
	}
	
	// 心跳重置
	_reset(){
		clearTimeout(this._timeoutObj);
		return this;
	}
	
	// 心跳开始
	_start(){
		let _this = this;
		this._timeoutObj = setInterval(() => {
			wx.senSocketMessage({
				// 心跳发送的信息应由前后端商量决定
				data:JSON.stringify({
					'key':'value'
				}),
				success(res){
				  console.log('发送心跳成功')
				},
				fail(err){
					console.log(err);
					_this._reset();
				}
			})
		},this._timeout)
	}
	
	// 监听websocket链接关闭
	onSocketClosed(options){
		wx.onSocketClosed(err => {
			// 停止心跳链接
			if(this._heartCheck){
				this._reset();
			}
			
			// 关闭已登陆开关
			this._isLogin = false;
			// 检测是否是用户自己退出小程序
			if(!this._isClosed){
				// 进行重联
				if(this._isReconnection){
					this._reConnect(options)
				}
			}
		})
	}
	
	// 检测网络变化
	onNetworkChange(options){
		wx.onNetworkStatusChange(res => {
			console.log('当前的网络状态：'+res.isConnected);
			if(!this._netWork){
				this._isLogin = false;
				// 进行重联
				if(this._isReconnection){
					this._reConnect(options)
				}
			}
		})
	}
	
	// 监听websocket打开
	_onSocketOpened(callback){
		wx.onSocketOpen(res => {
			console.log('websocket已打开');
			// 打开已登录开关
			this._isLogin = true;
			// 发送心跳
			if(this._heartCheck){
				this._reset()._start()
			}
			
			// 发送登录信息
			wx.sendSocketMessage({
				// 这里是第一次建立连接所发送的信息
				data:JSON.stringify({
					"key":"value"
				})
			})
			
			// 打开网络开关
			this._netWork = true;
			if(typeof callback === 'function'){
				callback(res)
			}else{
				console.log('参数的类型必须是函数')
			}
		})
	}
	
	// 接受服务器返回消息
	onReceivedMsg(callback){
		wx.onSocketMessage(msg => {
			if(typeof callback === 'function'){
				callback(msg)
			}else{
				console.log('参数的类型必须是函数');
			}
		})
	}
	
	// 建立websocket链接
	initWebSocket(options){
		let _this = this;
		this.wsUrl = options.url ? options.url : this.wsUrl;
		
		if(this._isLogin){
			console.log('您已经登陆了');
		}else{
			// 检查网络
			wx.getNetworkType({
				success(result){
					if(result.networkType != 'none'){
						//开始建立链接
						wx.connectSocket({
							url:_this.wsUrl,
							success(res){
								if(typeof options.success === 'function'){
									options.success(res)
								}else{
									console.log('参数类型必须是函数');
								}
							},
							fail(err){
								if(typeof options.fail === 'function'){
									options.fail(err)
								}else{
									console.log('参数类型必须是函数');
								}
							}
						})
					}else{
						_this._netWork = false
					}
				}
			})
		}
	}
	
	// 发送websocket消息
	sendWebSocketMsg(options){
		wx.sendsocketMessage({
			data:options.data,
			success(res){
				if(options.success && typeof options.success === 'function'){
					options.success(res)
				}
			},
			fail(err){
				if(options.fail && typeof options.fail === 'function'){
					options.fail(res)
				}
			},
		})
	}
	
	// 重联方法
	_reConnect(options){
		let timer,_this = this;
		if(this._connectNum < 3){
			timer = setTimeout(() => {
				this.initWebSocket(options)
			},3000)
		}else if(this._connectNum <10){
			timer = setTimeout(() => {
				this.initWebSocket(options)
			},10000)
		}else{
			timer = setTimeout(() => {
				this.initWebSocket(options)
			},450000)
			
			this._connectNum += 1;
		}
	}
	
	// 关闭websocket链接
	closeWebsocket(){
		wx.closeWebsocket();
		this._isClodes = true;
	}
}