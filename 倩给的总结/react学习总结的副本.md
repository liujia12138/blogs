#### react中的suspense的使用
	路由懒加载过程中，渲染页面可能会出现一段时间的空白延迟，使用suspense之后，可以优化交互，
#### react生命周期函数？
	1.初始化阶段：
		1.1 getDefultProps:获取实例的默认属性
		1.2 getInitialState:获取每个实例的初始化状态
		1.3 componentWillMount:组件即将被装载、渲染到页面上
		1.4 render:组件在这里生成虚拟的dom节点
		1.5 componentDidMount:组件真正在被装载之后
	
	2.运行中状态：
		2.1 componentWillReceiveProps:组件将要接收到属性的时候调用
		2.2 shouldComponentUpdate:组件接收到新属性或者新状态的时候
		2.3 componentWillUpdate:组件即将更新不能修改属性和状态
		2.4 render:组件重新描绘
		2.5 componentDidUpdate:组件已经更新
		
	3.销毁阶段
		componentWillUnmount组件即将销毁

#### react性能优化是哪个周期函数？
	shouldComponentUpdate这个方法用来判断是否需要调用render方法重新渲染dom。因为dom的渲染非常消耗性能，如果我们能在shouldComponentUpdate方法中能够写出更优化的dom diff算法，可以极大的提高性能。
	
#### 为什么虚拟dom会提高性能？
	虚拟dom相当于在js和真实dom中间加一个缓存，利用dom diff算法避免了没有必要的dom操作，从而提高了性能。
	
	具体实现步骤如下：
		用js对象结构表示dom树的结构；然后用这个树构建一个真正的dom树，查到文档中。
		当状态变更的时候，重新构建一个新的对象树，然后用新的树于旧的树进行对比，记录两棵树的差异
		把2中所记录的差异应用到步骤1中所构建的真正的dom树上，试图就更新了

#### 在react中element和component有什么区别？
	简单的说，一个react element描述了你想在屏幕上看到什么，换个说法就是，一个react element是一些ui的对象表示。
	一个react component是一个函数或一个类，他可以接受输入并返回一个react element。 
	
#### 为什么要使用React.Children.map(props.children,()=>{})而不使用props.children.map(()=>{})?
	因为不能保证props.children将是一个数组。
	在父组件只有一个子元素内部，如果我们尝试使用props.children.map映射子类，则会映射出错误，因为props.children是一个对象，而不是一个数组。
	如果父组件内有多个子元素，react只会使props.children成为一个数组，这就是为什么要使用React.Children.map,因为他的实现考虑到props.children可能是一个数组或者是一个对象。
	
#### Component和PureComponent区别？
	区别点：
		PureComponent自带通过props和state的浅对比来实现shouldComponentUpdate(),而Component没有。
		
		PureComponet缺点：
			可能会因深层的数据不一致而产生错误的否定判断，从而shouldComponentUpdate结果返回false，界面得不到更新。
		PureComponent优点:
			不需要开发者自己实现shouldComponentUpdate，就可以进行简单的判断来提升性能。
	
#### diff算法？
	把树形结构按照层级分解，只比较同级元素。
	给列表结构的每个元素添加唯一的key属性，方便比较。
	React只会匹配相同class的component（组件名称）合并操作，调用component的setState方法的时候，react将其标记为dirty。到每一个事件循环结束，react检查所有标记dirty的component重新绘制。选择性子树渲染。
	
#### react性能优化方案
	1. 重写shouldComponentUpdate来避免不必要的操作。
	2. 使用key来帮助react识别列表中所有子组件的最小变化。
	
#### 简述flux思想
	1. flux是一种架构思想，专门解决软件的结构问题，他跟mvc架构是同一类东西
	2. flux将应用分为了四个部分：
		view:视图层
		action:视图层发出的消息
		dispatcher:用来接收action，执行回调函数
		store:用来存放应用的状态，一旦发生变动，就提醒views要更新页面。
	3. flux最大的特点就是数据的"单项流动"，数据总是"单项流动",任何相邻的部分都不会发生数据的"双向流动"。
		3.1 用户访问view
		3.2 view发出用户的Action
		3.3 dispatcher收到action，要求store进行相应的更新
		3.4 store更新后，发出一个"change"事件
		3.5 view收到"change"事件后，更新页面
		
#### redux中间件
	中间件提供第三方插件的模式，自定义拦截action->reducer的过程。变为action->middlewares->reducer。这种机制可以让我们改变数据流，实现异步的action，action过滤，日志输出，异常报告等功能。
	常见的中间件：
		redux-logger 提供日志输出
		redux-thunk 处理异步操作
		redux-promise 处理异步操作，actionCreator的返回值是promise
		
#### redux有什么缺点？
	1. 一个组件所需的数据，必须由父组件传过来，而不能像flux中直接从store取
	2. 当一个组件相关数据更新时，即使父组件不需要用到这个组件，父组件还是会重新render，可能会有效率影响，或者需要复杂的shouldComponentUpdate进行判断
	
#### react组件的划分业务组件和技术组件？
	根据组件的职责通常把组件分为ui组件和容器组件
		ui组件负责ui的呈现，容器组件负责管理数据和逻辑
		两者通过react-redux提供connect方法联系起来

#### 可以选择性的传递给setState的第二个参数是什么？他的目的是什么？
	一个回调函数，当setState结束并render该组件，setState是异步的，

#### redux三大原则
	1. 唯一数据源：整个应用的state都被存储到一个状态树里面，并且这个状态树，只存在于唯一的store中；
	2. 保持只读状态：state是只读的，唯一改变state的方法就是触发action，action是一个用于描述已发生事件的普通对象
	3. 数据改变只能通过纯函数来执行：使用纯函数来执行修改，为了描述action如何改变state的，需要编写reducers

#### dva使用流程，使用时数据流向，核心功能封装了哪些库？
	数据的改变通常是通过用户交互行为或者浏览器行为触发的，当此类行为会改变数据的时候可以通过dispatch发起一个action，如果是同步行为会直接通过reducers改变state，如果是异步行为会先触发effects然后流向reducers最终改变state，所以在dva中，数据流向非常清晰简明，并且思路基本更开源社区保持一致；
	
	1. Subscription是一种从源获取数据的方法，它来自elm
		Subscription语义是订阅，用于订阅一个数据源，然后根据条件dispatch需要的action,数据源可以是当前事件，服务器的websocket的连接，keyboard输入，geolocation等
		
	2. Effects
		被称为副作用，在我们应用中，最常见的就是异步操作，它来自于函数编程的概念，之所以叫副作用是因为它使得我们的函数变得不纯，同样的输入不一定获得同样的输出
		dva为了控制副作用的操作，底层引入了redux-sagas做异步流程控制，由于采用了generator的相关概念，所以将异步转向同步写法，从而件effects转为纯函数；
		
	3. Reducers
		在dva中，reducers聚合累积的结果是model的state对象，通过action中传入的值，与当前reducers中的值进行运算获的新的值，需要注意的是Reducers必须是纯函数，所以同样的输入必然会得到相同的输出，他们不应该产生任何副作用，并且，每一次的计算都应该使用immutable data,这种特性简单理解就是每次操作都是返回一个全新的数据。
	
	4. State
		state表示model的状态数据，通常表现为一个js对象；操作的时候每次都要当作不可变数据来对待，保证每次都是全新对象，没有引用关系，这样才能保证state的独立性，便于测试和追踪变化。
	
	5. Action
		action是一个普通的js对象，它是改变state的唯一途径，无论是从ui事件，网络回调，还是websocket等数据源所获得的数据，最终都会通过dispatch函数调用一个action，从而改变对应的数据。action必须带有type属性指明具体的行为，其他的字段可以自定义，如果要发起一个action需要使用dispatch函数；需要注意的是dispatch是在组件connect models以后，通过props传入的
		dispatching function是一个用于触发action的函数，action是改变state的唯一途径，但是他只是描述一个行为，而dispatch可以看作是触发这个行为的方式，而reducer则是描述如何改变数据的。
		在dva中，connect model的组件通过props可以访问dispatch，可以通过调用model中的reducer或者是effects

#### 函数组件和class组件的区别
	区别：类继承的方式，相较于函数组件，有更多的特性
	
	内部状态：state
	
	生命周期函数：
		1. 如果一开始我就知道这个组件需要得到state或者生命周期函数组件时，就要毫不犹豫的使用类继承
		2. 如果一开始用不到这些特性的时候，我会先用函数式组件，如果随着业务的推进，组件需要应用到这些特性的时候，我会再把它构建成类继承的方式，

#### resf的作用？
	refs是react提供给我们的安全访问dom元素或者某个组件实例的句柄，我们可以为元素添加ref属性然后在回调函数中接收该元素在dom树中的句柄，该值会作为回调函数的第一个参数返回
	
#### react-redux
	React-Redux将所有组件分成两大类：UI组件和容器组件
	
	UI组件的特征：
		1. 只负责UI的呈现，不带有任何业务逻辑
		2. 没有状态（即不使用this.state这个变量）
		3. 所有数据都由参数(this.props)提供
		4. 不使用任何Redux的API

	容器组件的特征：
		1. 负责管理数据和业务逻辑，不负责UI的展现
		2. 带有内部状态
		3. 使用Redux的API

	组件：
		connect方法生成容器组件以后，需要让容器组件拿到state对象，才能生成UI组件的参数。
		React-Redux提供Provider组件，可以让容器组件拿到state。
		上面代码中，Provider在根组件外面包了一层，这样以来，app的所有子组件就默认可以拿到state了。

#### 线程和进程
	1.进程
		狭义定义:进程就是一段程序的执行过程
		
		进程的概念:
			(1) 进程是一个实体，每个进程都有他自己的地址空间，一般情况下，包括文本区域，数据区域和堆栈。
					文本区域存储处理器执行的代码；
					数据区域存储变量；
					进程执行期间使用的动态分配的内存；
					堆栈区域存储着活动过程调用的指令和本地变量。
			(2) 进程是一个执行中的程序，程序是没有一个生命的实体，只有处理器赋予程序生命时，他才能成为一个活动的实体，我们称为进程
			
	2.程序
		程序是指令和数据的有序集合，其本身没有任何运行的含义，是一个静态的概念。
		而进程则是在处理机上的一次执行过程，它是一个动态的概念。
		其实进程是包含程序的，进程的执行离不开程序，进程中的文本区域就是代码区，也就是程序。
		
	3.线程
		通常一个进程中可以包含若干个线程，当然一个进程至少含有一个线程，线程可以利用进程所拥有的资源，在引入线程的操作系统中，通常都把进程作为分配资源的基本单位，，而把线程作为独立运行和独立调度的单位，由于线程比进程更小，基本上不拥有系统资源。
		
	4.多线程
		多线程是为了同步完成多项任务，不是为了提高运行效率，而是为了提高资源使用效率来提高系统的效率。多线程是在同一时间需要完成多项任务的时候实现的。
	
#### HashRoter和BrowserRouter的区别？
	1.原理上
		HashRouter在路径中包含了#，相当于hTML的瞄点定位；
		而BrowserRouter使用的是HTML5的新特性history，没有HashRouter那样通用，低版本的浏览器不通用
		
	2.用法上
		BrowserRouter进行组件跳转时可以传递任意参数实现组件间的通信；
		而HashRouter不能，因此一般配合redux使用，实现组件间的数据通信。
		
	3.生产实践上
		HashRouter相当于瞄点定位，因此不论#后面的路径如何变化，请求的都相当于是#之前的那个页面，可以很容易的进行前后端不分离的部署，因为请求的链接都是ip地址：端口/#/xxxx,因此请求的资源路径永远是/，相当于index.html,而其他的后端API接口都可以正常请求，不会和/冲突，由于前后端不分离也不会产生跨域的问题。
		BrowserRouters的请求地址的链接是ip地址：端口/xxxx/xxxx,因此相当于每个url都睡访问不同的后端地址，如果后端没有覆盖到的路由就会产生404的错误
		
#### React.lazy懒加载组件
	1.用法
		React.lazy()方法可以异步加载组件文件。
			const Foo = React.lazy(() => import('../component/Foo'));
		React.lazy不能单独使用，需要配合React.suspense，suspense是用来包裹异步组件的，添加loading效果等。
			<Suspense fallback={<Spin />}>
				<Foo>
			</Suspense>
	2.原理
		React.lazy使用import来懒加载组件，import在webpack中最终会调用requireEnsure方法，来动态插入script来请求js文件，类似于jsonp的形势。
		
#### React.memo()
	1.是什么？
		React.memo()和PureComponent相似，他帮助我们控制何时重新渲染组件。
		
		组件仅在他的props发生改变的时候进行重新渲染，通常来说，在组件树中React组件，只要有变化就会走一遍渲染流程。但是通过PureComponent和React.memo(),我们可以仅仅让某些组件进行渲染。
		
		PureComponent要依靠class才能使用。而React.memo()可以和function component一起使用
		
#### Redux-thunk中间件
		redux store仅支持同步数据流。使用thunk等中间件可以帮助在redux应用中实现异步性。
		可以将thunk看做store的dispatch()方法的分装器；

#### redux中的compose？
	用来增强store的
	compose的源码：
		export  default function compose(...funcs){
			if(funcs.length === 0){
				return arg => arg
			}
			
			if(funcs.length === 1){
				return funcs[0]
			}
			
			return funcs.reduce((a,b) => (...arg) => a(b(...arg)))
		}

#### styled-components的基本使用指南
	1.基础用法
		在下面的例子中，我们用styled-components创建一个样式组件，该组件渲染之后是一个div标签。注意组件首字母必须是大写不然无法识别。
		
		  /* 创建了一个Wrapper样式组件，该组件渲染之后是一个div标签 */
		  const Wrapper = styled.div`
		    color: blue;
		  `;
		
		  /* Wrapper组件跟其余的react组件一样，只不过现在他们有了自己的样式 */
		  render(
		    <Wrapper>
		        Hello World!
		    </Wrapper>
		  );
		  
	2.选择器：标签名和类名
		可以通过标签名和类名设置样式组件中的html标签的样式
		const Wrapper = styled.div`
		    /* 应用于Wrapper组件本身和Wrapper组件里的所有html标签 */
		    color: black;
		
		    /* 应用于Wrapper组件里的h3标签 */
		    h3 {
		    color: red
		    }
		
		    /* 应用于Wrapper组件里的className为blue的html标签 */
		    .blue {
		    color: blue
		    }
		  `
		  
	3.选择器：伪类和伪元素
		在style-components同样可以使用伪类和伪元素，使用方法和原声css一样
		
		const Thing = styled.button`
		
		    color: blue;
		
		    ::before {
		      content: '！！！';
		    }
		
		    :hover {
		      color: red;
		    }
		  `
	
	4.嵌套
		&符号表示引用主组件
		
		const Thing = styled.div`
			/* 应用于className为blue的Thing组件 */
			&.blue{
			color: blue;
			}
		
			/* 应用于className为red的Thing组件里的所有子组件或者html标签 */
			.red {
			color: red;
			}
		  `
	5.上下文选择符
		在style-components同样可以使用各类上下文选择符
		
		const Thing = styled.div`
		
		    /* 应用于紧邻Thing组件的下一个Thing组件 */
		    & + & {
		    color: red;
		    }
		
		  `
#### react-router-dom中的link和Navlink的区别？
	1.<Route>
		Route组件主要的作用就是当一个location匹配路由的path时，渲染某些UI，exp;
			import { BrowserRouter as Router, Route } from 'react-router-dom'
			 
			<Router>
			   <div>
			     <Route exact path="/" component={Home}/>
			     <Route path="/news" component={NewsFeed}/>
			   </div>
			</Router>
	
	2.<Link>为应用提供声明式的，无障碍导航
	3.<NavLink>是<Link>的一个特定版本，会在匹配上当前URL的时候会给已经渲染的元素添加样式参数
	4.<Switch>只渲染出第一个于当前访问地址匹配的<Route>若没有则渲染<Redirect>
	5.<Redirect>渲染时将导航到一个新的地址，这个新的地址覆盖访问历史信息里面的本该访问的地址
	





#### mock.js
	1.语法规范
		1.数据模版定义规范
			1.1 'name|min-max':string 通过重复string生成一个字符串，重复次数大于等于min，小于等于max；
			1.2 'name|count':string 通过重复string生成一个字符串，重复次数等于count；
			
			1.3 'name|+1':number 属性值自动加1,初始值是number
			1.4 'name|min-max':number 生成一个大于等于min，小于等于max的整数，属性值number只是用来确定类型
			1.5 'name|min-max.dmin-dmax':number 生成一个小数，整数部分大于等于min，小于等于max，小数部分保留dmin到dmax；
			
			1.6 'name|1':boolean 随机生成一个布尔值
			1.7 'name|min-max':boolean 随机生成一个布尔值，值为value的概率为min/min+max，！value为max/min+max
			
			1.8 'name|count':object 从属性值object中随机选取count个属性
			1.9 'name|min-max':object 从属性值object中随机选取min到max个属性
			
			2.0 'name|1':array 从数组中随机选取1个元素，作为最终值
			2.1 'name|+1':array 从属性值array中顺序选取1个元素，作为最终值
			2.2 'name|min-max':array 通过重复属性值array生成一个新的数组，重复次数大于等于min，小于等于max
			2.3 'name|count':array 通过重复属性值array生成一个新的数组，重复次数为count
			
#### react hook中常用
	1.react-redux
		1.1 useDispatch:共享状态，返回redux中store中对dispatch的引用，可执行redux中的方法；
			const dispatch = useDispatch();
			
		1.2 useSelector:共享状态，从redux的store中提取数据（state）；
			const num = useSelector(state => state.num);
			
#### react虚拟dom是如何实现的?
	1.使用JSX
		例如:
			<!-- JSX - VDOM -->
			const vdom = <div id="foo">Hello!</div>
			
			<!-- VDOM - dom -->
			const dom = render(vdom);
			
			<!-- 添加树到<body> -->
			document.body.appendChild(dom);
			
			
		分片、迭代和逻辑，没有新的语法
		
		分片：是无逻辑/有限逻辑模版引擎引入的概念，用于在不同的上下文中复用的视图片段；
		
		迭代：是每一个模版语言好像重复发明的事物。使用jsx，没有一次性的语法去学习：迭代你在js程序中的任何地方。您选择最适合给迭代风格：[].forEach(),[].map(),for和while循环等；
		