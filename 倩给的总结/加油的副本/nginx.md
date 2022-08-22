#### nginx的定义
	nginx是开源、高性能、高可靠的web和反向代理服务器，而且支持热部署，几乎可以做到7*24小时不断运行，即使运行几个月也不需要重新启动，还能在不间断服务器的情况下对软件版本进行热更新。
	性能是nginx最重要的考量，其占用内存少，并发能力强，能支持高达5w个并发链接数，最重要的是免费的并且可以商业化，配置使用也比较简单
	
#### nginx的使用场景
	nginx擅长于底层服务器端资源处理(静态资源处理转发、反向代理、负载均衡等)
	1.静态资源服务，通过本地文件系统提供服务
	2.反向代理服务，延伸出包括缓存，负载均衡等
	3.api服务，OpenResty；
	
#### 简单请求/非简单请求
	1.简单请求和非简单请求
		条件：
		1.请求方法是HEAD、GET和POST三种之一；
		2.http头信息不超过右边几个字端：Accept、accept-Language、Content-Language、Last-Event-ID、Content-Type(只限于三个值：application/x-www-form-urlencoded、multipart/form-data、text/plain)
		
		同时满足以下两个条件，就属于简单请求，
		凡是不同时满足这两个条件，就属于非简单请求
		
	2.简单请求
		对于简单请求，浏览器会在头信息中增加origin字段后直接发出，origin字段用来说用，本次请求来自哪个源(协议+域名+端口)
		
		如果服务琦发现origin指定的源不再许可范围内，服务器会返回一个正常的http相应，浏览器渠道回应之后发现回应的头信息中没有包含access-Control-Allow-Origin字段，就会跑出一个错误给XHR的error事件
		
		如果服务器发现origin指定的域名在许可范围内，服务器返回的相应会都多几个access-control-开头的信息字段
		
	3.非简单请求
		是那种对服务器有特殊要求的请求，比如请求方法是put或者是delete,或Content-Type的值为application/json。浏览器会在正式通信之前，发送一次http预检options请求，先询问服务器，当前网页所在域名是否在服务器的许可名单之中，以及可以使用那些http请求方法和头信息字段，只有得到肯定答复，浏览器才会正式发出xhr请求，否则报错
		
#### 跨域
	定义：在浏览器上当前访问的网站向另一个网站发送请求获取数据的过程就是跨域请求
	
	跨域是浏览器的同源策略(协议、域名、端口)决定的，是一个重要的浏览器安全策略，用于限制一个origin的文档或者他家在的脚本与另一个源的资源进行交互，它能够帮助阻隔恶意文档，减少可能被攻击的媒介，可以使用cors配置解除这个限制。
	
#### 正向代理和反向代理（一般给客户端做代理的都是正向代理，给服务器做代理的就是反向代理）
	1.正向代理
		一般的访问流程是客户端直接向目标服务器发送请求并获取内容，使用正向代理后，客户端改为向代理服务器发送请求，并指定目标服务器，然后由代理服务器和原始服务器通信，转发请求并获得内容，在返给客户端，正向代理隐藏了真是的客户端，为客户收发请求，使真实客户端对服务器不可见
		
	2.反向代理
		与一般访问流程相比，使用反向代理后，直接收到请求的服务器是代理服务器，然后将请求转发给内部网络上真正进行处理的服务器，得到的结果返回给客户端，反向代理隐藏了真实的服务器，为服务器收发请求，使真实服务器对客户端不可见，一般在处理跨域请求的时候比较常用，现在基本所有的大型网站都设置了反向代理
	
#### 负载均衡
	一般情况下，客户端发送多个请求到服务器，服务器处理请求，其中一部分坑要操作一些资源比如数据库、静态资源等，服务器处理完毕后，再将结果返回给客户端
	
	定义：单个服务器解决不了的问题，可以使用多个服务器，然后将请求分发到各个服务器上，将负载分发道不同的服务器，就是负载均衡
	
	nginx实现负载均衡，一般来说指的是将请求转发给服务器集群
		
#### 动静分离
	为了加快网站的解析速度，可以把动态页面和静态页面由不同的服务器来解析，加快解析速度，降低原来单个服务器的压力。
	
	一般来说，都需要将静态资源和动态资源分开，由于nginx的高并发和静态资源缓存的特性，经常讲静态资源部署在nginx上。如果请求的是静态资源，直接到静态资源目录获取资源，如果是动态资源的请求，则利用反向代理，把请求转发给对应后台应用去处理，从而实现动静分离了

#### nginx操作常用命令
	1.nginx -s reload <!-- 重载 -->
	2.nginx -s reopen <!-- 重启-->
	3.nginx -s stop <!-- 快速关闭-->
	4.nginx -s quit <!-- 等待工作进程处理完成后关闭-->

#### nginx配置语法
main        # 全局配置，对全局生效
├── events  # 配置影响 Nginx 服务器或与用户的网络连接
├── http    # 配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置
│   ├── upstream # 配置后端服务器具体地址，负载均衡配置不可或缺的部分
│   ├── server   # 配置虚拟主机的相关参数，一个 http 块中可以有多个 server 块
│   ├── server
│   │   ├── location  # server 块可以包含多个 location 块，location 指令用于匹配 uri
│   │   ├── location
│   │   └── ...
│   └── ...
└── ...


一个nginx配置文件的结构就像nginx.conf显示的那样，配置文件的语法规则
	1.配置文件是由指令和指令块构成的
	2.每条指令以；结尾，指令与参数间以空格符号分割
	3.指令块以{}将多条指令组织到一起
	4.include语句允许组合多个配置文件可以提升可维护性
	5.使用#注释
	6.使用$标识变量
	7.部分指令的参数支持正则表达式
	
	
指令后面
	1.=表示精确匹配路径，用于不含正则表达式的uri前，如果匹配成功，不再进行后续查找
	2.^～用于不含正则表达式的uri前，表示如果该符号后面的字符是最佳匹配，采用该规则，不再进行后续查找
	3.～表示该符号后面的正则去匹配路径，区分大小写
	4.～*表示用该符号后面的正则去匹配路径，不区分大小写。跟～优先级都比较低，如果由多个location的正则能匹配的话，则使用正则表达式最长的那个
	
	如果uri包含正则表达式，则必须要有～和～*标志
	
#### 配置反向代理
server {
  listen 9001;
  server_name *.sherlocked93.club;
  
  location ~ /vod/ {
    proxy_pass http://127.0.0.1:8081;
  }
}


反向代理的指令
	1.proxy_set_header：再将客户端请求发送给后端服务器之前，更改来自客户端的请求头信息
	2.proxy_connect_timeout：配置nginx与后端代理服务器尝试建立连接的超时时间
	3.proxy_read_time:配置nginx向后端服务器发出的red请求后，等待相应的超时时间
	4.proxy_send_timeout:配置nginx向后端服务器组发出的write请求后，等待相应的超时时间
	5.proxy_redirect：用于修改后端服务器返回的相应头中的location和refresh
	
#### 配置header解决跨域
	当浏览器在访问跨域的服务器时，也可以在跨域的服务器上直接设置nginx，从而前端就可以无感的开发，不用把世纪上访问后端的地址改成前端服务的地址，这样可适性比较高
	
	
	# /etc/nginx/conf.d/be.sherlocked93.club.conf

server {
  listen       80;
  server_name  be.sherlocked93.club;
  
	add_header 'Access-Control-Allow-Origin' $http_origin;   # 全局变量获得当前请求origin，带cookie的请求不支持*
	add_header 'Access-Control-Allow-Credentials' 'true';    # 为 true 可带上 cookie
	add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';  # 允许请求方法
	add_header 'Access-Control-Allow-Headers' $http_access_control_request_headers;  # 允许请求的 header，可以为 *
	add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
	
  if ($request_method = 'OPTIONS') {
		add_header 'Access-Control-Max-Age' 1728000;   # OPTIONS 请求的有效期，在有效期内不用发出另一条预检请求
		add_header 'Content-Type' 'text/plain; charset=utf-8';
		add_header 'Content-Length' 0;
    
		return 204;                  # 200 也可以
	}
  
	location / {
		root  /usr/share/nginx/html/be;
		index index.html;
	}
}

#### 开启gzip压缩/nginx配置gzip压缩
	使用gzip不仅需要nginx配置，还需要浏览器端配置，需要在请求头消息中包含accept-encoding:gzip。
	
	一般在请求html和css等静态资源的时候，支持的浏览器在request请求静态资源的时候，会加上accpet-encoding：gzip这个header，表示自己支持gzip的压缩方式，nginx在拿到这个请求的时候，如果由相应的配置，就会返回经过gzip压缩过的文件给浏览器，并在response相应的时候加上content-encoding：gzip来告诉浏览器自己采用的是压缩的方式，浏览器拿到压缩文件后，根据自己的解压方式进行解析。
	
 /etc/nginx/conf.d/gzip.conf

gzip on; # 默认off，是否开启gzip
gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

#### 负载均衡
	nginx提供了好几种分配方式，默认为轮询，就是轮流来，有以下集中分配方式
		1.轮询：默认方式，每个请求按照时间顺序逐一分配到不同的后端服务器，如果后端服务器挂掉了，能够自动剔除
		2.weight：权重分配，指定轮询几率，权重越高，被访问的概率也就越大，用于后端服务器性能不均的情况下
		3.ip_hash:每个请求按照访问ip的has结果分配，这样每个方可固定访问一个后端服务器，可以解决动态网页session共享的问题。负载均衡每次请求都会重新定位到服务器集群中的某一个，那么已经登陆某一个服务器的用户在重新定位到另一个服务器，那么登录信息将会丢失，这样明显不妥
		
#### 配置动静分离
	把动态和静态的请求分开，方式主要有两种：1.纯粹的把静态文件独立成单独域名，放在独立的服务器上，这也是目前主流推崇的方案；另一种方法就是动态和静态文件混合在一起发布，通过nginx配置来分开
	
	通过location 指定不同的后缀名实现不同的请求转发。通过expires参数设置，可以使浏览器缓存过期时间，减少与服务器之前的请求和流量。
	
	具体的expires定义：是给一个资源设定一个过期时间，也就是说无需去服务端验证，直接通过浏览器自身确认是否过期即可，所以不会产生额外的流量，我这里设置 3d，表示在这 3 天之内访问这个URL，发送一个请求，比对服务器该文件最后更新时间没有变化。则不会从服务器抓取，返回状态码 304，如果有修改，则直接从服务器重新下载，返回状态码 200。
	
#### 一些常用的技巧
	1.静态服务
		server {
			listen  80;
			server_name   static.sherlocked93.club;
			charset utf-8;
			
			location /download {
				 alias	          /usr/share/nginx/html/static;  # 静态资源目录
				    
				autoindex               on;    # 开启静态资源列目录
				autoindex_exact_size    off;   # on(默认)显示文件的确切大小，单位是byte；off显示文件大概大小，单位KB、MB、GB
				autoindex_localtime     off;   # off(默认)时显示的文件时间为GMT时间；on显示的文件时间为服务器时间
			}
		}
		
	2.图片防盗链
		server {
			listen 80;
			server_name *.sherlocked93.club;
			
			<!-- 图片防盗链 -->
			location ～*\.(git|jpg|jpeg|png|bmp|swf)$ {
				valid_referers none blocked server_names ~\.google\. ~\.baidu\. *.qq.com;
				if ($invalid_referer){
				      return 403;
				    }
			}
		}
		
	3.请求过滤
		if($request_method !~^(GET|POST|HEAD)$){
			return 403
		}
		
		location / {
			# IP访问限制（只允许IP是 192.168.0.2 机器访问）
			  allow 192.168.0.2;
			  deny all;
			  
			  root   html;
			  index  index.html index.htm;
		}
		
	4.配置图片、字体等静态文件缓存
		# 图片缓存时间设置
			location ~ .*\.(css|js|jpg|png|gif|swf|woff|woff2|eot|svg|ttf|otf|mp3|m4a|aac|txt)$ {
				expires 10d;
			}
			
	5.http请求转发到https
		配置完 HTTPS 后，浏览器还是可以访问 HTTP 的地址 http://sherlocked93.club/ 的，可以做一个 301 跳转，把对应域名的 HTTP 请求重定向到 HTTPS 上
		server {
			listen      80;
			server_name www.sherlocked93.club;

			# 单域名重定向
			if ($host = 'www.sherlocked93.club'){
				return 301 https://www.sherlocked93.club$request_uri;
			}
			# 全局非 https 协议时重定向
			if ($scheme != 'https') {
				return 301 https://$server_name$request_uri;
			}

			# 或者全部重定向
			return 301 https://$server_name$request_uri;

			# 以上配置选择自己需要的即可，不用全部加
		}
		
	6.适配PC与移动环境
	
	
#### 配置实例
	1.正向代理
		实现效果：在浏览器中输入www.google.com,浏览器跳转到www.google.com
		具体配置：
			server{
				resolver 8.8.8.8;
				listen 80;
				
				location / {
					proxy_pass http://$http_host$request_uri
				}
			}
			
	2.反向代理
		1. 	实现效果：在浏览器中输入www.abc.com,从nginx服务器跳转到linux系统tomact主页面。
			具体配置：
				server {
					listen 80;
					server_name 192.168.4.32; #监听地址
					
					location / {
						root html; #/html目录
						proxy_pass http://127.0.0.1:8080; #请求转向
						index index.html index.htm; #设置默认页面
					}
				}
				
		2.  实现效果：根据在浏览器中输入不同路径，跳转到不同端口的服务中
			具体实现：
				server {
					listen 9000;
					server_name 192.168.4.32; #监听地址
					
					location ~/example/ {
						proxy_pass http://127.0.0.1:5000;
					}
					
					location ~/example1/ {
						proxy_pass http://127.0.0.1:8080;
					}
				}
				
			location指令说明：
				·～表示uri包含正则表达式，且区分大小写；
				·～*表示uri包含正则表达式，且不区分大小写
				·=表示uri不包含正则表达式，要求严格匹配
				
	3.负载均衡
		实现效果：在浏览器中输入 http://192.168.4.32/example/a.html ,平均到5000和8080端口中，实现负载均衡效果
		具体配置：
			upstream myserver {
				server 192.167.4.32:5000;
				server 192.168.4.32:8080;
			}
			
			server {
				listen 80;
				server_name 192.168.4.32; #监听地址
				
				location / {
					root html; #html目录
					index index.html index.htm; #设置默认页
					proxy_pass http://myserver; #请求转向myserver定义的服务器列表
				}
			}
			
		策略：
			权重
				upstream myserver {
					server 192.167.4.32:5000 weight=10;
					server 192.168.4.32:8080 weight=5;
				}
			
			ip
				upstream myserver {
					ip_hash;
					server 192.167.4.32:5000 ;
					server 192.168.4.32:8080;
				}
				
			fair(按后端服务器的响应时间来分配，响应时间短的优先分配到请求)
			    upstream myserver { 
			        fair;  
			        server 192.168.4.32:5000;
			        server 192.168.4.32:8080;
			    }

	4.nginx缓存
		实现效果：在3天内，通过浏览器地址栏访问 http://192.168.4.32/a.jpg ,不会从服务器端抓去资源，3天后从服务器端重新下载
		具体配置：
			# http 区域下添加缓存区配置
			proxy_cache_path /tmp/nginx_proxy_cache levels=1 keys_zone=cache_one:512m inactive=60s max_size=1000m;

			# server 区域下添加缓存配置
			location ~ \.(gif|jpg|png|htm|html|css|js)(.*) {
				 proxy_pass http://192.168.4.32:5000；#如果没有缓存则转向请求
				 proxy_redirect off;
				 proxy_cache cache_one;
				 proxy_cache_valid 200 1h;            #对不同的 HTTP 状态码设置不同的缓存时间
				 proxy_cache_valid 500 1d;
				 proxy_cache_valid any 1m;
				 expires 3d;
			}
			
	5.动静分离
		实现效果：通过浏览器地址栏访问 www.abc.com/a.html,访问静态资源服务器的静态资源内容，通过浏览器地址栏访问www.abc.com/a.jsp，访问动态资源服务器的动态资源内容。
		具体配置：
			upstream static {
				server 192.167.4.31:80;
			}
			
			upstream dynamic {
				server 192.167.4.32:8080;
			}
			
			server {
				listen 80; #监听端口
				server_name www.abc.com; #监听地址
				
				#拦截动态资源
				location ～.*\.(php|jsp)${
					proxy_pass http://dynamic;
				}
				
				#拦截静态资源
				location ~.*\.(jpg|png|htm|html|css|js)$ {
					root /data/; #html目录
					proxy_pass http://static;
					autoindex on ; #自动打开文件列表
				}
			}
	
			
#### nginx是如何实现高并发的？
	异步，非阻塞，使用了epoll和大量的底层代码优化。
	
	nginx采用一个master进程，多个woker进程的模式
		·master进程主要负责收集、分发请求。每当一个请求过来时，master就拉起一个worker进程负责处理这个请求
		·同时master进程也负责监控worker的状态，保证高可靠性
		·worker的进程一般设置为跟cpu核心数一致。nginx的worker进程在同一时间可以处理的请求数只受内存限制，可以处理多个请求
	
	nginx的异步非阻塞的工作方式把当中的等待时间利用起来。在需要等待的时候，这些进程就空出来待命，因此表现为少数几个进行就解决了大量并发的问题。
	
	（了解就好）每进来一个request，会有一个worker进程去处理。但不是全程处理，处理到发生阻塞的地方，比如向上游服务器转发request，并等待请求返回，那么这个处理worker就很聪明，他会在发送完成后之后，注册一个事件：“如果upstream返回了，告诉我一声，我再接着干”，于是他就去休息了，此时如果在有request请求进来，他就可以很快的按照这种处理方式进行处理，而一旦上有服务器返回了，就会出发这个事件，worker才回来接手，这个request才会接着往下走
	
#### nginx为什么不用多线程呢
	Apache：创建多个进程或线程，而每个进程或线程都会为其分配cpu和内存，并发会消耗大量的服务器资源。
	nginx：采用单线程来异步非阻塞处理请求，不会为每个请求分配cpu和内存资源，节省了大量的资源，同时也减少了大量的cpu的上下文的切换，使的nginx能够支持更高的并发
	
#### nginx有哪些优化配置
	1.调整worker_precesses
		指nginx要生成的worker数量，最佳实践是每个cpu运行一个工作进程
		
	2.最大化worker_connections
		nginx web服务器可以同时提供服务的客户端数。与working_processes结合使用时，获得美妙可以服务的最大客户端数。
		
		最大客户端数/秒 = 工作进程*工作者连接数
		
		为了最大化nginx的全部潜力，应将工作者连接设置为核心一次可以运行的允许最大进行数1024.
		
	3.启用gzip
	4.为静态文件启用缓存
	5.timeouts
		keepAlive链接减少了打开和关闭链接所需的cpu和网络开销，获得最佳性能需要调整的变量可参考
	6.禁用access_log
		访问日志记录，他记录了每个nginx请求，因此消耗了大量的cpu资源，从而降低nginx性能