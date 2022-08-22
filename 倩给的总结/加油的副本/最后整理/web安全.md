#### 解决跨域的五种办法
	同源策略：协议+域名+端口
	允许跨域加载资源的：img script link
	
	五种方法：
		1.jsonp
			·ajax属于同源策略，jsonp属于非同源策略
			
			·优缺点
				1.简单兼容性好
				2仅支持get方法具有局限性，不安全可能会收到xss攻击
				
			·实现流程
				1.声明一个回调函数，其函数名（如show）当作参数值，要传递给跨域请求数据的服务器，函数形参为要获取目标数据(服务器返回的data)
				2.创建一个<script>标签，src =“跨域的接口地址?callback=show”
				3.服务器接受到请求以后，需要把传递进来的函数名和返回数据拼接成一个字符串，就是show('我不爱你')
				服务器把准备好的数据返回给客户端，客户端在调用执行回调函数show，对其返回数据进行操作
				
			·遇到的问题
				在开发中可能会遇到多个jsonp请求的回调函数名是相同，这时候就需要封装一个jsonp函数
					<!-- index.html 前端-->
					function jsonp({ url, params, callback }){
						return new Promise((resolve,reject) => {
							let script = document.createElement('script');
							
							window[callback] = function(data){
								resolve(data)
								document.body.removeChild(script)
							}
							
							params = {...params,callback};
							let arrs = [];
							for(let key in params){
								arrs.push(`${key}=${params[key]}`)
							}
							
							script.src=`${url}?${arrs.join('&')}`
							documents.body.appendChild(script)
						})
					}
					
					
					jsonp({
						url:'http://localhost:3000/say',
						params:{wd:'iloveyou'},
						callback:show
					}).then((data) => {
						console.log(data);
					})
					
					
				<!-- 服务端 -->
				let express = require('express');
				let app = express();
				app.get('/say',function(req,res){
					let {wd,callback} = req.query;
					res.end(`${callback}(`我不爱你`)`)
				})
				
				app.listen(3000）
				
		2.cors
			·方法
				服务端设置access-Control-Allow-Origin设置为*，该属性表示那些域名可以访问资源
			·相关方法
				1.Access-Control-Allow-Origin 设置哪个源可以访问
				2.Access-Control-Allow-Headers 允许携带哪个头可以访问
				3.Access-Control-Allow-Methods 允许哪个方法访问

		3.postMessage
			·postMessage()方法允许来自不源元的脚本采用异步方式进行通讯
			·解决的问题
				1.页面和其新打开的窗口的数据传递
				2.多窗口之间的消息传递
				3.页面与嵌套的iframe消息传递
				4.跨域数据的传递
			
			·方法
				otherWindow.postMessage(message,targetOrigin,[transfer])
		4.webSocket
			·webSocket和http都会应用层的协议，都是基于TCP协议的。
		
			ws.onopen = function(evt) { 
			  console.log("Connection open ..."); 
			  ws.send("Hello WebSockets!");
			};
			
			ws.onmessage = function(evt) {
			  console.log( "Received Message: " + evt.data);
			  ws.close();
			};
			
			ws.onclose = function(evt) {
			  console.log("Connection closed.");
			};	
		5.nginx反向代理
			·原理类似于node中间件代理，需要你搭建一个中转nginx服务器，用于转发请求
			upstream
			proxy_pass
			
#### xss的原理
	WEB应用程序混淆了用户提交的数据和JS脚本的代码边界，导致浏览器把用户的输入当成了JS代码来执行
	类型：
		存储型 XSS 
		反射型 XSS 
			反射型 XSS 跟存储型 XSS 的区别是：存储型 XSS 的恶意代码存在数据库里，反射型 XSS 的恶意代码存在 URL 里
		DOM 型 XSS
			DOM 型 XSS 跟前两种 XSS 的区别：DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞
			
	措施
		输入过滤，不要相信任何客户端的输入；
		对 HTML 做充分转义；
		设置 HTTP-only：禁止 JavaScript 读取某些敏感 Cookie，攻击者完成 XSS 注入后也无法窃取此 Cookie。
		验证码：防止脚本冒充用户提交危险操作。
		谨慎使用：.innerHTML、.outerHTML、document.write()；
		
#### CSRF的原理
	跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的
	
	防御策略：
	自动防御策略：同源检测（Origin 和 Referer 验证）。
	主动防御措施：Token验证 或者 双重Cookie验证 以及配合Samesite Cookie。
	保证页面的幂等性，后端接口不要在GET页面中做用户操作。
	
#### DNS劫持和http劫持
