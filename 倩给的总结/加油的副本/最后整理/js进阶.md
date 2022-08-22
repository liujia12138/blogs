#### 手写promise
	1.规定
		promise有三个状态pending，fulfilled，rejected
		
		class Promise{
			constructor(executor){
				
				this.state = 'pending';
				this.value = undefined;
				this.reason = undefined;
				
				this.onResolveCallbacks = [];
				this.onRejectedCallbacks = [];
				
				let resolve = value => {
					if(this.state === 'pending'){
						this.state = 'fulfilled';
						this.value = value;
						
						this.onResolveCallbacks.forEach(fn => fn())
					}
				};
				
				let reject = reason => {
					if(this.state === 'pending'){
						this.state = 'rejected';
						this.reason = reason;
						this.onRejectedCallbacks.forEach(fn => fn())
					}
				}
				
				<!-- 如果executor执行报错时 -->
				try{
					executor(resolve,reject)
				}catch(error){
					reject(error)
				}
			}
			
			then(onFulfilled,onRejected){
				if(typeof onFulfilled === 'function'){
					onFulfilled = value = {
						return value
					}
				}
				
				if(typeof onRejected === 'function'){
					onRejected = reason => {
						return reason
					}
				}
				
				return  new Promise((resolve,reject) => {
					if(this.state === 'fulfilled'){
						const x = onFulfilled(this.value);
						resolvePromise(promise1,x,resolve,reject)
					}
					
					if(this.state === 'rejected'){
						const x = onRejected(this.reason)
						resolvePromise(promise1,x,resolve,reject)
					}
					
					if(this.state === 'pending'){
						this.onResolveCallbacks.push(() => {
							const x = onFulfilled(this.value);
							resolvePromise(promise1,x,resolve,reject)
						})
						
						this.onRejectedCallbacks.push(() => {
							const x = onRejected(this.reason)
							resolvePromise(promise1,x,resolve,reject)
						})
					}
				})
			}
			
			catch(onRejected){
				return this.then(null,onRejected)
			}
			
			all(promiseList){
				return new Promise((resolve,reject) => {
					let index = 0 ; 
					results = [];
					
					for(let i= 0 ;i < promiseList.length ;i ++){
						let item = promiseList[i]
						
						item.then(result => {
							index++;
							results[i] = result
							if(result === promiseList.length){
								resolve(results)
							}
						}).catch(reason => {
							reject(reason)
						})
					}
				})
			}
			
			race(promiseList){
				return new Promise((resolve,reject) => {
					promiseList.forEach(item => {
						item.then(result => {
							resolve(result)
						}).catch(error => {
							reject(error)
						})
					})
				})
			}
		}
	
	
function resolvePromise(promise1,x,resolve,reject){
	<!-- 循环引用报错 -->
	if(x === promise1){
		return reject('error')
	}
	
	<!-- 防止多次调用 -->
	let called;
	<!-- x不是null，且x是对象或者是函数 -->
	if(x !== null && (typeof x ==='object' || typeof x === 'function')){
		try{
			const {then} = x;
			<!-- 如果then是函数，就默认是promise了 -->
			if(typeof then === 'function'){
				then.call(x,y => {
					if(called) return 
					called = true;
					resolvePromise(promise1,y,resolve,reject)
				},error => {
					if(called) return 
					called = ture;
					reject(error)
				})
			}else{
				resolve(x);
			}
		}catch(error){
			if(called) return
			called = ture;
			reject(error)
		}
	}else{
		resolve(x);
	}
}	

#### 节流和防抖
	1.防抖
		例子：限制鼠标连击触发
		在事件被触发n秒后在执行回调，如果在这n秒内又被触发，则重新计算计时
		
		<!-- 非立即执行 -->
		function debounce(fn ,delay = 500){
			let timer = null;
			
			return function(){
				clearTimeout(timer);
				
				const context = this;
				const args = [...arguments];
				
				timer = setTimeout(() => {
					fn.call(context,args)
				},delay)
			}
		}
		
		<!-- 立即执行 -->
		function debounce(fn,delay = 500){
			let timer = null;
			
			return function(){
				const context = this;
				const args = [...arguments];
				
				if(timer) clearTimeout(timer);
				
				const callNow = !timer;
				
				timer = setTimeout(() => {
					timer = null
				},delay)
				
				if(callNow) fn.call(context,args)
			}
		}
		
		
		<!-- 综合版本 -->
		
		function debounce(fn,delay,immediate){
			let timer = null;
			
			return function(){
				if(timer) clearTimeout(timer)
				
				const context = this;
				const args = [...arguments];
				if(immediate){
					const callNow = !timer;
					timer = setTimeout(() => {
						timer = null
					},delay)
					
					if(callNow) fn.call(context,args)
				}else{
					timer = setTimeout(() => {
						fn.call(context,args)
					},delay)
				}
			}
		}
		
		
2.节流
	连续触发事件但是在n秒内只执行一次函数
	
	function throttle(fn,delay){
		let timer = null;
		
		return function(){
			if(timer) return
			
			let context = this;
			const args = [...arguments];
			
			timer = setTimeout(() => {
				fn.call(context,args);
				timer  = null;
			},delay)
			
		}
	}
	
#### 介绍一下前端路由
	
	2.定义：就是为了保证只有一个html页面，且与用户交互时不刷新和跳转页面的同时，为spa的每一个视图展示匹配一个特殊的url，再刷新，前进，后退和seo时均由这个url来实现
		
	3.并且他有两种模式
		1.hash模式
			hash指的就是#以及后面的字符
			由于hash值的斌华不会导致浏览器会向服务器发送请求，而且hash值的改变会引起hashchange事件，因此浏览器的前进和后退都是可以检测的
			
			监听hash值
			window.addEventListener('hashchange',function(e){
				e.newURL/e.oldURL
			})
			
			实现一个路由对象
			class HashRouter{
				constructor(){
					this.routers = [];
					
					window.addEventListener('hashchange',this.load.bind(this),false)
				}
				
				register(hash,callback =function(){}){
					this.routers[hash] = callback
				}
				
				registerIndex(callback =function(){}){
					this.routers['index'] = callback
				}
				
				<!-- 用于调用不同视图的回调函数 -->
				load(){
					const hash = location.hash.slice(1);
					let handler;
					if(!hash){
						handler = this.routers.index
					}else{
						handler = this.routers[hash]
					}
					
					handler.call(this)
				}
			}
			
		2.history模式
			在html5之前浏览器就已经有了history对象
			history.back();
			history.forward();
			history.go()
			
			如何监听：
			window.addEventListener('popstate'，function(e){},false)只能监听前进和后退
			
			新增了以下几个api
				history.state 返回当前状态对象
			
				history.pushState(state,title,url) 添加新的状态到历史状态线
				history.replaceState(state,title,url) 用新的状态替换当前的状态
				
			其中	
				state:合法的js对象，可以用在popstate事件中
				title:大多数浏览器都忽略了这个参数，基本上就是null
				url：任意有效的url，用于更新浏览器的地址栏
				
			区别的话：
				1.pushstate在保留现有历史记录的同时，将url加入到历史库 中
				2.replacestate将历史记录中当前记录替换成url
				
			可以改变url的同时，不刷新页面
			
			class HistoryRouter{
				constructor(){
					this.routers = [];
				}
				
				register(path,callback = function(){}){
					this.routers[path] = callback
				}
				
				resgisterIndex(callback = function(){}){
					this.routers['/'] = callback
				}
				assign(path){
					history.pushState({path},null,path)
					this.dealPatherHandler(path)
				}
				replacfe(path){
					history.replaceState({path},null,path)
					this.dealPatherHandler(path)
				}
				dealPatherHandler(path){
					let handler;
					if(this.routers.hasownProperty(path)){
						handler = this.routers['404'] || function(){}
					}else{
						handler =  this.routers[path]
					}
					
					handler.call(this)
				}
			}
			
	比较:
		hash的兼容性更好，可以兼容到ie8,无需服务端
		
	如何监听pushstate和replacestate的变化？
		const bindEventListener = function(type){
			const historyEvent = history[type];
			
			return function(){
				const newEvent = historyEvent.apply(this,arguments)；
				const e = new Event(type);
				e.arguments = arguments;
				
				window.dispatchEvent(e); //自定义事件触发
				
				return newEvent
			}
		}
		
		history.pushState = bindEventListener('pushState')
	
		window.addEventListener('pushState')
		
### css怎么开启硬件加速
	浏览器在处理下面的css的时候，会使用GPU渲染
	1.transform:translate3d(0,0,0) /transform:translateZ(0)
		
#### 常用设计模式有哪些并举例使用场景
	1.工厂模式-传入参数即可创建实例
		虚拟dom根据参数的不同返回基础标签的vnode和组件vnode
		
	2.单例模式-整个程序有且仅有一个实例
		vuex和vue-router的插件注册方法install判断如果系统中存在实例就直接回掉
		
	3.发布-订阅模式（vue事件机制）
	4.观察者模式(响应式数据原理)
	5.装饰模式
	6.策略模式
		