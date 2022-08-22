#### 什么是虚拟dom？
	就是通过js对象模拟dom中的节点，然后在通过特定的render方法将其渲染成真实的dom
	虚拟dom就是一个普通的js对象，包含tag，props，children三个属性‘’
	
	render方法接受一个虚拟节点对象参数，起作用就是将虚拟dom转化为真实的dom
	
#### 类组件和函数组件之间的区别是啥？
	类组件可以使用其他的特性，如状态state和生命周期
	函数组件只接受props渲染到页面，也称无状态组件
	
	区别：
		函数组件的性能要比类组件的性能高，因为类组件使用的时候需要实力化，而函数组件直接执行函数返回结果就可
		函数组件没有this，也没有生命周期，更没有state状态
		
#### react中的refs的作用？
	refs提供了一种访问在render方法中创建的dom节点或者是react元素的方法
	
#### react事件机制
	react并不是将click事件绑定到div的真实dom上，而是在doucments处监听了所有事件，当事件发生并且冒泡到document处的时候，react将事件内容封装并交给真正的处理函数运行。这样的方式不仅仅减少了内存的消耗，还能够在组件挂载/销毁时候统一订阅和移除事件。
	
	除此之外，冒泡到document上的事件不是浏览器的原生事件，而是由react自己实现的合成事件（syntheticEvent）。因此如果不想要
事件冒泡的话应该调用的是e.preventDefaul方法。

	合成事件的优点
		1.兼容所有浏览器，更好的跨平台
		2。将事件统一存在在一个数组，避免频繁的新增与删除
		3.方便react统一管理和事务机制
	
	事件的执行顺序为原生事件先执行 -> 合成事件后执行 
	合成事件会冒泡绑定到document上，所以尽量避免原生事件和合成事件的混用
	
#### react的事件和普通的html事件有什么不同？
	区别：
		1.对于事件的命名方式，原声事件全部小写，react事件采用小驼峰
		2.对于事件函数处理语法，原生事件为字符串，react事件为函数
		3.react事件不能采用return false的方式来组织浏览器的默认行，而必须使用preventDefault来组织默认行。

#### react组件中怎么做事件代理？他的原理是什么？
	react基于虚拟dom实现了一个合成事件层，定义的事件处理器会接收到一个合成事件对象的实例，他符合w3c标准，且与原生的浏览器事件拥有相同的接口，支持冒泡机制，所有事件都自动绑定到最外层
	原理：
		1.事件委派，react会将所有事件绑定到结构的最外层，使用统一的事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数
		2.自动绑定：react组件中，每个方法的上下文都会指向这个组件的实例
		
#### react高阶组件
	1.定义：是一种设计模式，接受一个组件和额外的参数，返回一个新的组件，hoc是纯函数，没有副作用
	
	2.实现方式：
		1.属性代理（返回一个无状态的函数组件/返回一个class组件）
		2.反向继承
		
	3.属性代理：使用组合的方式，通过将组件包装在容器组件中实现功能
		
	优点：
		1.抽取重复代码，实现组件复用
		2.条件渲染，控制组件的渲染逻辑
		3.捕获/劫持别处理组件的生命周期
		
#### react高阶组件、render props、hook有什么区别，为什么要不断的迭代呢？
	react高阶组件缺点：hoc传递给被包裹组件的props容易和被包裹后的组件重名，容易被覆盖
	
	render prop：
		具有render prop的组件接受一个返回react元素的函数，将render的渲染逻辑注入到了组件的内部。
		缺点：
			无法在return与局外访问数据
			
	hook：在不实用class情况下使用state和react的其他特性
		优点：
			使用直观，
			解决了hoc的prop的重名问题
			解决了render props因共享数据而出现的嵌套问题
			能在return之外使用数据的问题

	都是为了解决代码的复用问题
	
#### react.component和react.pureComponent的区别
	pureComponent表示一个纯组件，减少render函数执行的次数，从而提高组件的性能
	其中的shouldComponentUpdate进行的是浅比较，也就是比较引用地址，一般用在纯展示的组件上。
	
#### Component（组件）、Element（元素）、Instance（实例）之前有什么区别和联系？
	函数组件没有instance ，类组件有instance
	
#### React.createClass和extends component的区别有哪些？
	1.语法的区别
		createClass的初始状态由getInitial函数返回一个对象
		component定义在contsructor属性中，更加接近es6的语法
	2.propTypes和getDefaultProps
		createClass通过propType和getDefaultProps来设置和获取props
		component通过设置propTypes和defaultProps设置props
		
	3.state的区别
		createClass使用的是getInitialState
		component使用的是this.states
	4.this的区别
		creatclass会自动绑定到组件上
		component不会自动绑定到组件上，需要使用bind
	5.mixins
		createClass可以使用mixins，
		但是components不可以使用
#### state和props区别
	相同点：
		都是普通的js对象，都包含影响渲染输出的信息。
		
	不同点：
		1.state是组件自己管理数据，控制自己的状态，可变
		2.props是外部传入的数据参数，不可变
		3.没有state的叫做无状态组件，有state的叫做有状态的组件

#### 如何创建refs？
	refs是使用react.createRef()创建的，并通过ref属性附加到react元素。在构造组件时，通常将refs分配给实例属性，以便可以在整个组件中引用他们

#### 在构造函数调用super并将props作为参数传入的作用是啥？
	在调用super方法之前，子类构造函数无法使用this引用，将props参数传递给super调用的主要原因是子构造函数中能通过this.props来获取传入的props

#### 什么是控制组件
	在html中，例如表单元素<input><textarea><select>通常维护自己的状态，并根据用户输入进行更新。当用户提交表单时，来自上述元素的值将随表单一起发送。
	
	而react的工作方式则不同。包含表单元素组件将跟踪其状态的输入值，并在每次回调函数触发的时候重新渲染组件，因为状态被更新，以这种方式由react控制其值的输入表单元素成为受控组件
	
	受控组件的缺陷：
		表单元素的值都是由react组件进行管理，当有多个输入狂，或者多个这种组件时，如果想同时获取到全部的值就必须每个都要编写事件处理函数，这会让代码看着十分臃肿
		
	非受控组件：如果一个表单组件没有value props就可以称为非受控组件
#### 什么是jsx？
	就是将原始html模版嵌入js代码中，就称为jsx。因为jsx本身不能被浏览器所识别，必须使用babel和webpack等工具将其转换为传统的js。
	
#### 什么是react hooks?
	
#### react中的useState是什么？
	useState是一个内置的react hook。返回一个数组，其中第一个参数是当前的状态，第二个参数提供来更新状态的方法。
	
#### react中的strictMode(严格模式)是什么？
	react中的strictMode是一种辅助组件，可以帮助咱们编写更好的react组件，可以使用strictMode包装一组组件，并可以帮助咱们检查：
		1.验证内部组件是否遵循某些推荐做饭，如果没有，会在控制台给出警告
		2.验证是否使用的是已经废弃的方法
		3.通过识别潜在的风险预防一些副作用
		
#### 
#### 什么是diff算法
	react需要同时维护两个虚拟dom树，一个表示当前的dom树，另一个是react状态变时更将要重新渲染时生成。react通过比较两个树的差异，决定是否修改dom结构，以及如何修改。这种算法成为diff算法
	
#### diff算法的具体过程
	diff算法会对新旧两棵树做深度优先遍历，避免两棵树做完全的比较，然后给每一个节点生成一个唯一的标识
	
	1.在遍历过程中，每遍历到一个节点，就会将新旧两棵树做比较，并且只对同一级别的元素进行比较
		差异类型：
			1.不同类型的元素
			2.同类型的元素
			3.文本节点
			4.移动、删除、新增子节点
			
	2，唯一标识key	
		key在列表中具有唯一性，但是在全局不具有唯一性
		key具有稳定性，一个元素确定key之后就不会在重新创建
		
#### react虚拟dom怎么执行的（树的遍历和diff）

	dom diff则是通过js层面的计算，返回一个patch对象，即补丁对象，再通过特定的操作解析patch对象，完成页面的渲染
	
	diff算法	（同层比较）
		1.当节点类型相同时，去看一下属性是否相同，产生一个属性的补丁包
			{type:'ATTRS',attrs:{class:'list-group'}}
		2.新的dom节点不存在{type:'REMOVE'，index:xxx}
		3.节点类型不相同直接采用替换模式{type:'REPLACE',newNode:newNode}
		4.文本变化：{type:'TEXT',text:1}
		
		
	比较两颗虚拟dom树的核心diff方法接受了oldTree和newTree两个参数，根据两个虚拟对象创建不定，描述改变的内容，将这个补丁用来更新dom。这个方法的核心在与walk递归树，该方法价格比较后的差异节点放到补丁包中
		function diff(oldTree,newTree){
			let patches ={};
			let index = 0; //默认先比较第一层
			
			<!-- 递归树  将比较后的几点放到补丁包中 -->
			walk(oldTree,newTree,index,patches)
			
			return patches
		}
		
		
	walk递归树
		多种情况：
			1.新节点删除了子节点
				currentPatch.push({type:'REMOVE',index:index})
			2.判断两个文本是否一样
				currentPatch.push({type:'TEXT',text:newNode})
			3.两个节点的元素类型相同的话，就比较属性
				
			4.节点被替换了
				currentPatch.push({type:'REPLACE',newNode})
				
	patch补丁
		当我们通过diff犯法获取补丁，然后通过patch打补丁来惊醒更新dom，从而更新视图
				
		patch接受node元素节点，patches所有的补丁两个参数，其作用就是给元素打补丁，重新更新视图
		
		function patch(node,patches){
			allPatch = patches;
			wali(node)
		}
		
	walk给每个元素打补丁
		该方法接受node元素节点一个参数，将补丁一次次执行，获取元素的子节点进行递归遍历。若每一层都存在补丁，则执行daPatch方法
		function walk(node){
			let currentPatch = allPatches[index++];
			let childNode = node.childNode;
			childNode.forEach(child => walk(child));
			
			if(currentPatch){
				doPatch(node,currentPatch)
			}
		}
		
		
	具体步骤：
		1.用js对象模拟dom（虚拟dom）
		2.把虚拟dom转成真实dom并插入页面中（render）
		3.如果有事件发生修改了虚拟dom，则比较两个虚拟dom的差异，得到差异对象（diff）
		4.把差异对象应用对真正的dom树上
#### react 15的生命周期
	生命周期可以分为三个阶段：初始化阶段，更新阶段，卸载阶段
	初始化阶段：constructor，componentWillMount（通过render函数生成虚拟dom之前触发），render，componentDidMount
	更新阶段：componentWillReceiveProps（是由父组件更新触发，跟props无关），shouldComponentUpdate,componentWillUpdate,render componentDidUpdate
	卸载阶段：componentwillUnmont

#### react 16的生命周期
	去掉了componentWillMount和componentWillUpdate，使用getDerivedStateFromProps代替这两个方法，同时在更新阶段增加了一个getSnapshotBeforeUpdate方法
	
	初始化阶段：constructor，getDerivedStateFromProps（用来替换componentWillReceivedProps）,render ,componentDidMount
	更新阶段：getDerivedStateFromProps，shouldComponentUpdate，render,getSnapshotBeforeUpdate,componentDidUpdate
		getDerivedStateFromProps:
			1.是用来根据父组件传递过来的props来更新自身的state的方法
			2.是一个静态的方法，声明使用static
				static getDerivedStateFromProps(props,state){
					return newState
				}
			3.替换componentWillRecevieProps的意义
				因为getDerivedStateFromProps内部拿不到组件实例，导致无法进行this.setState这类操作，确保生命周期的行为更加可控。
#### react 16和15的虚拟dom架构有什么变化？
	总结
		1.v16当中虚拟dom被打上了标识，并且增加了scheduler用于调度任务的优先级
		2.生命周期的变化
	
	react 15	
		1.可以分为两层
			Reconciler(协调器) -> 负责找出变化的组件
			Renderer(渲染器) -> 负责将变化的组件渲染到页面上
			
		2.Reconciler
			视图更新的方式
				render()、setState()、forceUpdate()
			当react触发更新时，reconciler会一次完成以下工作
				1.调用函数组件，class组件的render方法，将jsx转化为虚拟dom
				2.将虚拟dom和上次更新的虚拟dom进行对比
				3.通过对比找出本次更新中变化的虚拟dom
				4.通知renderer将变化的虚拟dom渲染到页面上
				
		2.renderder
			用于管理一个react树，使其根据底层平台进行不同的调用
			reactdom：负责将react组件渲染成web环境中的dom
			
		缺点：
			Reconciler和renderer是交替工作的，当第一个li在页面行已经变化后，第二个li再进入reconciler。如果第二个li执行很久，那么用户就会一直卡在当前的页面
			在组件初始化或更新的时候，会递归更新子组件。由于递归执行，所以一旦开始中途无法结束。但组件层级很深的时候，递归事件超过了16.6ms，用户节点就会卡顿
			
			
	react16
		1.可以分为三层
			scheduler(调度器) -> 负责调度任务的优先级，高优先级的先进入scheduler
			reconciler(协调器) -> 负责找出更新的组件
			renderer(渲染器) -> 负责将需要更新的组件更新到页面上
			
		1.scheduler
			支持在空闲器内调用回调，执行任务
			
		2.reconciler	
			主要工作：
				1.能够把可中断的任务切片处理
				2.能够调整优先级，重置并复用任务
				3.能够在父元素和子元素之间交错处理，以支持react中的布局
				4.能够在render中返回多个元素
				5.更好的支持错误边界
				
		3.renderer
			与v15的蕾丝，但是不同的是reconciler为虚拟的dom打上了标记，同步执行对应dom操作
#### react15的算法有什么风险？
	在react16之前，每一次组件的更新都会触发react去构建一个新的虚拟dom树，通过与上一次虚拟dom树的diff算法对比，实现对dom定向更新。这个过程是一个递归的过程，调用展非常深，只有最底层的返回了，这个渲染过程才开始逐层返回。而且这个漫长的过程不可能被打断，所以用户页面可能会卡死
	
	
#### fiber是什么？
	filber是react16对于react核心算法的一次重写
	filber使原本同步渲染的过程变成了异步
	
#### fiber是怎么处理渲染的
	讲一个大的任务拆分成很多小的任务。每当执行完一个任务，渲染线程都会把主线程交还回去，看看有没有更高级别的工作要处理，确保任务不会被卡死，并且避免了同步渲染带来的卡顿。

#### filer对象如何实现渲染进程可分段完成呢？
	1.dom组件实例均对应一个filer实例，filer实例负责管理组件实例的更新，渲染任务及与其他filer实例的联系
	2.filer的工作是在内存中进行的，不会对页面造成影星，用户感知不到，处理后的结果交给render处理
	
#### 废除的生命周期跟fiber之间的关系
	在fiber机制下，render阶段是允许被暂停，终止和重启的。当一个任务执行到一半被另一个任务抢去了主动权，那么这个任务被重启的形式就是重复执行一遍整个任务，这就导致render阶段的生命周期可能被重复执行
	
#### react声明组件有哪几种方式。
	1.函数式声明组件，也就是无状态组件
	2.es5的react.createClass
	3.es6的extends component
	
#### 对于有状态组件和无状态组件的理解和使用场景
	1.有状态组件
		特点：
			是类组件、有继承、可以使用this、可以使用react的生命周期、内部使用state来维护自身状态的变化
	2.无状态组件	
		特点：不依赖于自身的state，可以是类组件也可以是函数组件，完全避免this关键字。有更高的性能，不需要state来维护自身的状态变化。
		缺点：
			无法使用ref，无生命周期，无法控制组件的重新渲染。
			
#### 对于react中的fragment的理解，使用场景是什么？
	在react中，组件返回的元素只有一个跟元素，为了不增加多余的dom节点，我们可以使用fragment标签来包裹所有的元素。
	
#### react如何获取组件对应的dom元素？
	1.可以使用ref来获取某个子节点的实例
		创建ref的三个方法
			1.字符串格式<p ref="info"/>
			2.函数格式 <p ref={ele => this.info = ele}/>
			3.createRef的方法：this.info = React.createRef();
			
#### 对于react的插槽（portals）的理解，如何使用，有那些使用场景
	portals使得组件可以脱离父组件挂载在dom树的任何位置
	语法:
		ReactDOM.createPortal(child,container)
		
#### react如何避免不必要的渲染
	1.shouldComponentUpdate和pureComponet
	2.使用react.memo,用来缓存组件渲染，避免不必要的更新，只能用于函数组件
		
#### 对react context的理解
	在react中，数据传递一般使用props传递数据，维持单项数据流，这样可以让组件之间的关系变得简单且可预测
	
	context提供了一种在组件之间共享此类值的方式，而不必显示的通过组件树的逐层传递props
	
	老版的context实现方式：组件一层一层向下传递的过程，只是不用开发者写传递的代码，react会自动传递，因为一层一层传递的设计，性能肯定会有问题
	
	context传递的应该是一个不常变的数据，不建议使用context传递多变数数据
	
#### react组件的构造函数有什么作用？他是必须的么？
	构造函数主要目的：
		1.初始化组件的state
		2.给事件处理方法绑定this
		
	js中的bind每次都会返回一个新的函数，为了性能考虑，尽量在constructor中绑定事件
	
#### react.forwardRef是什么？它有什么作用？
	React.forwardRef会创建一个react组件，这个组件能够将其接受的ref属性转发到其组件树上的另一个组件。
	作用：
		创建一个react组件，该组件能够将其接受的ref属性转发到内部的一个组件中
		
	应用场景：
		ref的作用就是获取实例，可能是dom实例，也可能是classComponent的实例
		
		用于转发ref，这样子组件的内部dom，不用扩充额外的ref字段
		
	存在的问题：
		1.如果目标组件是函数组件，是没有实例，此时就会报错
		2.props不能传递ref
		
		<!-- 转发ref -->
		const Child = React.forwardRef((props,ref) => {
			return (
				<div>
					<button ref={ref}>漩涡</button>
				</div>
			)
		})
		
		function App(){
			const child = useRef<any>();
			
			useEffect(() => {
				setTimeout(() => {
					console.log(child);
				},2000)
			},[])
			
			return (
				<div>
					<Child ref={child}/>
				</div>
			)
		}
		
		<!--高阶组件中使用forward -->
		function logProps(wrappedComponent){
			class logprops extends Component{
				componentDidUpdate(prevProps){
					console.log(prevProps,this.props);
				}
				
				render(){
					const {componentRef,...rest} = this.props;
					return <WrappedComponent {...rest} ref={this.props.componentRef} />
				}
			}
			
			return forwardRef((props,ref) => {
				return <Logprops {...props} componentRef={ref} />
			})
		}
		
#### 类组件与函数组件的异同
	相同点：
		1.都一样接收一个只读的props
		2.都返回一个react元素
		
	不同的点:
		1.设计思想方面
			类组件是基于面向对象编程的，它主要是继承、生命周期等
			函数组件是基于函数式编程的思想
		2.使用场景上
			如果存在使用生命周期的组件，那么主推类组件
			但是由于hook的出现，生命周期概念的淡出，函数组件可以完全替代类组件
			
		3.性能优化上
			类组件主要依靠shouldComponentUpdate阻断渲染来提升性能
			函数组件主要依赖react.memo缓存渲染接过来提升性能
			
#### 数据管理


#### react.setState调用原理
	执行过程
		1.首先调用setstate入口函数，入口函数在这里充当一个分发器的角色，根据入参的不同将其分发到不同的函数中去
		2.enqueueSetState方法将新的state放进组件的状态队列里，并调用enqueueUpdate来处理将要更新的实例对象
		3.在enqueueUpdate方法中引出了一个关键的对象batchingStrategy,该对象具备isBatchingUpdate属性决定当下是要走亘更新流程，还是应该排队等候。
		
#### React setState调用后发生了什么？
	react会将传入的参数对象与组件当前的状态合并，然后触发调和过程，经过调和过程，react会以相对高效的方式根据新的状态构建react元素树并且重新渲染整个ui页面
	在react得到新的虚拟dom之后，进行diff计算得出差异，并进行更新
	
#### react setState是同步还是异步？
	默认是异步的，但是一些情况下是同步的。
	
	在源码中，通过isBatchingUpdates来判断setstate是放入队列中还是直接更新，true一步操作，false直接更新
	
	异步情况：在react可以控制的地方，就会true,比如react生命周期时间和合成事件中
	通不过情况：在react无法控制的地方，比如原生事件，具体就是addEventListener,setTimeout,setInterval只能是同步更新
	
	总结：
		1.setState只在合成事件和钩子函数中是异步的，在原生事件和setTimeout中都是同步的。
		2.setState的异步并不是内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新代码之前，导致在合成事件和钩子函数中没有办法里吗拿到更新值，就形成了所谓的异步。
		3.setState的批量更新优化也是建立在异步之上的。原生事件和setTimeout中不会批量更新，在异步中如果对其中一个值进行多次的setState,那么就会进行覆盖，取最后一次执行
		
#### 为什么setstate会进行批处理，什么时候进行批处理
	react会对所有react内部处罚的事件监听函数中的更新做批处理，如果绕过了react组件就不会进行批处理
	
	如果我们想要对非react内部触发函数进行批处理
		promise().then(() => {
			ReactDOM.unstable_batchedUpdates(() => {
				
			})
		})
		
	原理：在react的setState函数中，会根据isBatchingUpdates来判断当前变量是否直接更新，默认是false，但是react调用事件处理函数的时候，会先调用batchedUpdates，将isBatchingUpdates的值设置为true,那么所有的更新会被放入队列中，直到函数结束，此时更新state
	
#### 如何获取最新的setstate的值	
	1.给setState传递一个函数，访问当前的state
		this.setState(() => ({title:title+1}))
	2.利用setstated的第二个参数，在callabck中获取
	
	
#### 函数式编程的特点
	1.给定相同的输入，总是返回相同的输出（props的不可变性就是保证了给定相同呼出的理念）
	2.过程没有副作用
	3.不依赖外部状态
	
#### react性能优化在哪个生命周期？原理是什么？
1.在shouldComponentUpdate(nextProps,nextState)，在进行新旧对比的时候是进行的浅对比，所以只要数据引用地址没有变，即使内容变了也回被判定为true
	解决办法1.使用setState改变数据之前用 assgin进行省考被，但是拷贝的是第一层
	
####组件的通信
	通信的几种情况：
		1.父组件向子组件通信
			父组件通过props向子组件传递需要的信息
		2.子组件向父组件通信
			props+回调的方式
			
		3.跨级组件通信
			利用context,进行跨组件通信
			const {Consumer,provider} = react.createContext();
			class Children extends Component{
				render(){
					return {
						<Consumer>
						{(value) => (
						 <div> {value.text}</div>
						)}
						</Consumer>
					}
				}
			}
			
			class Children1 extends Component{
				render(){
					return (
						<Children />
					)
				}
			}
			class Parent extend Copponent{
				render(){
					return (
						<Provider value={{text:'1212'}]}>
							<div>
								<Children>
							</div>
						</Provider>
					)
				}
			}
		4.非嵌套关系的组件通信
			即没有任何包含关系的组件，包括兄弟组件以及不再同一父级中的非兄弟组件
			1.可以使用redux进行全局状态管理
			2.兄弟元素的话，可以使用变量提升
			
#### 路由
	
#### react-router-dom和react-router和history库三者的关系
	1.history是react-router的核心，里面集成了popState.replaceState,pushState等方法
	2.react-router是react-router-dom的核心，里面封装了router、route、switch等核心组件，实现了从那路由的改变到组件的更新的核心功能，在我们的项目中只要一次性引入react-router-dom就可以了
	
	react-router-dom，在react-router的核心基础上，添加了用于跳转的link组件和history模式下的browserRouter和hash
	模式下的hashrouter组件等。
	
#### 如何配置react-router实现路由的切换
	1.使用<Route>组件
		<Route path="/" component={Home} />
	2.结合使用<Switch>组件和<Route>组件
		<Switch>
			<Route />
		</Switch>
	3.使用<Link><NavLink><Redirect>组件
	
#### redux的步骤
	1.在src下创建store文件下，在其下创建index.js文件，创建reducer.js
		<!-- index.js -->
			import {createStore} from 'redux' //引入createStore方法
			import reducer from './reducer.js'
			const store = createStore(reducer); //创建数据存储库
			export default store //store暴露出去
			
		<!-- reducer -->
			const defaultState = {}
			export default (state = defaultState,action){
				return state
			}
	2.使用store.getState获取初始化状态
		<!-- app.js -->
			import React，{Component} from 'react'；
			import store from './store';
			
			class App extends Component{
				constructor(props){
					super(props)
					this.state = store.getState();
				}
			}
			
	3.创建action,dispatch传递action
		想要改变redux中state的值，只能通过action。action创建好了，需要通过dispatch方法传递给store
		changValue(e){
			const action = {
				type:'changevalue',
				value:'e.target.value'
			}
			
			store.dispatch(action)
		}
	4.store与reducer的传递
		store只是一个仓库，并没有管理能力，会把接收到的action传递给reducer
		reducer并不能直接修改state需要声明一个newState return返回给store重新createStore
		export default(state=defaultState，action){
			if(action.type === 'changevalue'){
				let newState = JSON.parse(JSON.stringify(state)) //需要深拷贝
				newState.inputValue = action.value
				
				return newState
			}
		}
	5.store数据更新，编写代码使组件更新
		constructor(props){
			this.state = store.getState();
			store.subscribe(this.storeChange) //订阅redux 状态发生状态改变触发
		}
		
		storeChange(){ //注意使用箭头函数this的指向
			this.setState( store.getState())
		}
		
	6.创建acton types的变量
		写大型项目时，会产生许多的action types，每次写action的时候都会产生一个type，因此就会产生无用的代码，且type需要一一对应
			1.创建一个单独管理type的文件
				export const CHANGE_VALUE = 'changevalue';
				export const ADD_ITEM = 'additem'
			2.	引入组件使用
				import {CHANGE_VALUE,ADD_ITEM} from './store/action'
				changeValue(){
					const action = {
						type:'CHANGE_VALUE',
						value:e.target.value
					}
					
					store.dispatch(action);
				}
			3.引入Reducer进行修改
				import {CHANGE_VALUE,ADD_ITEM} from './action'
				export default (state=defaultState,action) => {
					if(action.type === CHANGE_VALUE){
						let.value newState = JSON.parse(JSON.stringify(state));
						newState.inputValue = action.value;
						
						return newState
					}
				}
				
	7.管理redux action	
		把项目中所有的redux action整理到一个文件内进行管理，提高项目可维护性，防止代码混乱
		1.建立actionCreators.js
			import {CHANGE_VALUE} from './action'
			export const changeAction = (value) => {
				type:CHANGE_VALUE，
				value
			}
			
		2.修改list代码
			import {changeAction} from './actionCreators'
			changeValue(){
				const action = changeAction(e.target.value);
				store.dispatch(action)
			}
		
#### redux注意的三点
	1.store必须是唯一的
	2.只有store能改变自己的内容，reducer不能改变
	3.reducer必须是纯函数（简单来说纯函数的返回值只受参数的影响）
	
#### redux-thunk
	redux-thunk是redux常用的插件
		
	在dispatch一个action之后，到达reducer之前，进行一些额外的操作，就需要用到middleware（中间件）。在实际工作中可以使用中间件来进行日志记录，创建崩溃报告，调用异步接口或路由。这个中间件可以使用redux-thunk来进行增强，他就是对redux中的diaptch的加强
		1.配置redux-thunk组件
			<!-- 使用中间件需要引入applyMiddleware -->
			import {createStore,applyMiddleware,compose} from 'redux'；
			<!-- 引入thunk -->
			import thunk from 'redux-thunk'
			
			<!-- 官方实例 -->
			const store = createStore(reducer,applyMidleware(thunk))
			
		createStore只允许有两个函数存在，我们需要使用增强函数compose 
			<!-- 使用compose创建一个增强函数，相当于链式函数 -->
			const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_
			? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
			: compose
			
			const enhancer = composeEnhancers(applyMiddleware(thunk));
			const store = creatStore(reducer,enhancer);
			export default store
			
		2.使用方法
			之前的actionCreators文件中都是定义好的action方法，没有办法写业务逻辑，安装redux-thunk之后可以吧todoList中的业务逻辑放到这里编辑
			import axios from 'axios'；
			export const getTodoList = () => {
				return () => {
					axios.get('http:xxxx').then({data} => {
						const action = getListAction(data)
						dispatch(action)
					})
				}
			}
			
			export const getListAction = (data) => {
				type:GET_LIST,
				data
			}
			
#### jsx的使用注意事项
	1.如果使用一个字符串，可以使用引号，但是如果要作为表达式解析的话，就不能使用引号
	2.在jsx中，有些属性名称需要做特殊的处理，如className。
	3.jsx标签是闭合的，那么结尾需要用/>
	
#### react-redux将组件区分为了容器组件和ui组件
	1.容器组件会处理逻辑
	2.后者只负责显示和交互，内部不做处理，状态完全由外部掌控
	
	1.Provider
		<Provider store={store}>
			<App />
		</Provider>
		这个组件的目的就是为了让所有的组件都能够访问到redux中的数据
		
	2.connect
		connect(mapStateToProps,mapDispatchToProps)(MyComponent)
		其中的是mapStateToProps就是把redux中的数据映射到react中的props中
		mapDispatchToProps就是把各种dipatch也编程props可以直接使用
		
#### redux-saga
	如果按照原始的饿redux工作流，当组件中产生一个action之后就会直接触发reducer修改state，reducer又是一个纯函数，也就不能在reducer中进行异步操作
	而实际，组件中发生的action后，在进入reducer之前需要完成一个异步的任务，比如发送ajax请求后拿到数据，在进入reduer，显然redux是支持这种操作的
	这时候就需要中间件redux-saga来解决
	
	1.takeEvery
			接到任务就会执行
			首先我们创建一个将执行异步action的任务
				<!-- put就等于dispatch，call可以理解为实行一个异步函数，是阻塞型的，只有运行后面的函数，才会继续往下，在这里可以片面的理解为async中的await，但是写法更加直观 -->
				import {put ,call} from ‘redux-saga/effects’；
				export function  *fetchData(action){
					const apiAjax = (params) => fetch(url,params) ;
					const data  = yield call(apiAjax);
					yield put({
						type:'FETCH_SUCCEEDED',
						value
					})
				}
				
			然后在每次 FETCH_REQUESTED action 被发起时启动上面的任务,也就相当于每次触发一个名字为 FETCH_REQUESTED 的action就会执行上边的任务,代码如下
			import { takeEvery } from 'redux-saga'

			function* watchFetchData() {

			  yield* takeEvery("FETCH_REQUESTED", fetchData)
			}
			
	2.takeLatest
		takeEvery允许多个fetchData实例同时启动，在某个特定时刻，我们可以启动一个新的fetchData任务,尽管之前还有多个fetch
		Data尚未结束
		
		如果我们只想得到最新的那个请求像一个，我们可以使用takeLatest辅助函数
		import {takeLatest} from 'redux-saga'
		
		function *watchFetchData(){
			yield *takeLatest('FETCH_REQUESTED',fetchData)
		}
		
	不同点
		1.在任何时刻takeLatest只允许执行一个fetchDatar任务，并且这个任务是最后被启动的那个，如果之前已经有任务在执行了，那么之前的这个任务就会被取消
		
	3.effect creators
		redux-saga提供了很多创建effect的函数，下面是常用的集中
			1.take(pattern)
				监听未来的action，他创建了一个命令对象，告诉中间件等待一个特定的action，generator会暂停，知道一个与pattern相匹配的action被发起以后，才会执行下面的语句
				也就是说take是一个阻塞型的effect	
				
				用法：
					yield take('FETCH_REQUESTED')
					console.log('执行了');
			2.put(action)
				是用来发送action的effect,是redux中dedispatch函数，但put一个action之后reducer就会计算新的state并返回	
				put也是阻塞的effect
				
				用法：
					yield put({
						type:'FETCH_REQUESTED',
						data
					})
			3.call(fn,...args)
				可以调用其他函数的函数。fn函数可以是一个generator函数，也可以是一个返回promise的普通函数
				
				call函数也是阻塞型的effect
				
				yield call(fn,500)
				
			4.fork(fn,..args)
				与call很相似，都是用来调用其他函数的函数。但是fork函数是非阻塞的函数
				yield fork(addItemFlow)
				
			5.select(selector,..args)
				用来指示middleware调用提供的选择器获取store上的state数据，可以理解为redux框架中获取store上的state数据一样的功能：store.getState().
				用法：
					yield select(state => state.getTodoList.list)
					
#### redu-saga的基本用法总结：
	1.使用createSagaMiddleware方法创建一个saga的middleware,然后在创建redux的store时，使用applyMiddleware函数将创建的saga middleware实例绑定到store上面，最后可以调用saga middleware的run函数来执行某个或者是某些middlware
	2.在saga的middleware中，可以使用takeEvery或者是takeLatest等api来监听某个action，当某个action触发后，saga可以使用call发起一步操作，操作完成后使用put函数触发action，同步更新state，从而完成完整的state的更新
			
			
#### react hook原理剖析
	1.react hook如何保存状态
		react hooks保存状态的位置其实与类组件的一致
			1.两者状态值都被挂载在组件实例对象fiberNode的memoizedState属性中，
			2.两者保存状态值的数据结构完全不同；类组件是直接把state属性保存到memoiedState属性中；而react hooks是用链表来保存状态的，memoizedState属性保存的实际上是这个链表的头指针
			
	2.react hooks如何更新状态
	
#### hooks的优势
	1.hook之间的状态是独立的，不会出现混淆状态的情况
	2.解决了组件树不直观，类组件难维护，逻辑不容易复用的问题
	3.避免函数重复执行的副作用

#### react hooks的常用api
	1.useState 给函数组件添加状态
	2.useEffect 第一个参数是接受一个函数，在组件更新的时候执行，第二个参数是依赖更新的内容，并且可以实现组件卸载的时候要执行的事情
	3.useLayoutEffect 在dom更新完成之后执行某个操作  执行时机是useEffect之前
		useEffect执行时机是render之后
		useLayoutEffect执行时机在dom更新之后
	4.useMemo 让组件中的函数根据状态更新，为了避免由于其他状态更新导致的当前函数的被迫执行,返回的是一个值
	5.useCallback 跟随状态更新执行，只有依赖状态改变的时候才会执行
		useMemo(() =>fn,deps)相当于useCallback(fn,deps)
			返回的是一个函数，不再是一个值，useCallback缓存的是一个函数，而useMemo缓存的是一个值
	6.useRef 长久保存数据
		注意事项：
			1.保存一个值，在整个生命周期中维持不变
			2.重新复制ref.current不会触发重新渲染
			3.相当于创建-个额外的容器来存储数据，我们可以在外部拿到这个值
			 
	7.useContext 带着子组件渲染 上层数据发生改变，肯定会重新渲染
		注意：
			1.我们需要引入useContext和createContext两个内容
			2.通过createContext创建一个context句柄
			3.通过provider确定数据共享范围
			4.通过value来分发数据
			5.在子组件中，通过useContext来获取数据
			
	8.userReducer 去其他地方借资源
		注意：函数组件的redux的操作
			1.创建数据仓库store和管理者reducerEDUCER
		
			2.通过useReducer(store,dispatch)来获取state和dispatch
			
	9.自定义hooks
		放在utils文件夹中，以use开头命名
		步骤：
			1.引入react和自己需要的hook
			2.创建自己的hook函数
			3.返回一个数组，第一个是数据，第二个是修改数据的函数
			4.暴露自定义hook函数出去
			5.引入自己的业务组件中
		import React，{useState,useEffect} from 'react';
		export const useLoadData = () => {
			const [num,setNum] =  useState(1);
			useEffect(() => {
				setTimeout(() => {
					setNum(2)
				},1000)
			},[])
		}




		
#### 对 Redux 的理解，主要解决什么问题、
	1.React是视图层框架。Redux是一个用来管理数据状态和UI状态的JavaScript应用工具
	2.Redux 提供了一个叫 store 的统一仓储库，组件通过 dispatch 将 state 直接传入store，不用通过其他的组件。并且组件通过 subscribe 从 store获取到 state 的改变。使用了 Redux，所有的组件都可以从 store 中获取到所需的 state，他们也能从store 获取到 state 的改变。这比组件之间互相传递数据清晰明朗的多
	
	主要解决的问题： 单纯的Redux只是一个状态机，是没有UI呈现的，react- redux作用是将Redux的状态机和React的UI呈现绑定在一起，当你dispatch action改变state的时候，会自动更新页面。
	
#### Redux 原理及工作流程
	1.原理
		Redux源码主要分为以下几个模块文件
	
		1.compose.js 提供从右到左进行函数式编程
		2.createStore.js 提供作为生成唯一store的函数
		3.combineReducers.js 提供合并多个reducer的函数，保证store的唯一性
		4.bindActionCreators.js 可以让开发者在不直接接触dispacth的前提下进行更改state的操作
		5.applyMiddleware.js 这个方法通过中间件来增强dispatch的功能
		
	2.工作流程
		1.const store= createStore（fn）生成数据;
		2.action: {type: Symble('action01), payload:'payload' }定义行为;
		3.dispatch发起action：store.dispatch(doSomething('action001'));
		4.reducer：处理action，返回新的state;
		
		通俗点解释：
		
		首先，用户（通过View）发出Action，发出方式就用到了dispatch方法
		然后，Store自动调用Reducer，并且传入两个参数：当前State和收到的Action，Reducer会返回新的State
		State—旦有变化，Store就会调用监听函数，来更新View
		
#### Redux 中异步的请求怎么处理
		redux异步流中间件其实有很多，当下主流的异步中间件有两种redux-thunk、redux-saga
		1.redux-thunk
			
			优点:
				1.体积⼩: redux-thunk的实现⽅式很简单,只有不到20⾏代码
				2。使⽤简单: redux-thunk没有引⼊像redux-saga或者redux-observable额外的范式,上⼿简单
			
			缺点:	
				耦合严重: 异步操作与redux的action偶合在⼀起,不⽅便管理
				
			
			使用步骤：
				1.配置中间件，在store的创建中配置
					import {createStore, applyMiddleware, compose} from 'redux';
					import reducer from './reducer';
					import thunk from 'redux-thunk'
					
					// 设置调试工具
					const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
					// 设置中间件
					const enhancer = composeEnhancers(
					  applyMiddleware(thunk)
					);
					
					const store = createStore(reducer, enhancer);
					export default store;
				2.添加一个返回函数的actionCreator，将异步请求逻辑放在里面
					/**
					  发送get请求，并生成相应action，更新store的函数
					  @param url {string} 请求地址
					  @param func {function} 真正需要生成的action对应的actionCreator
					  @return {function} 
					*/
					// dispatch为自动接收的store.dispatch函数 
					export const getHttpAction = (url, func) => (dispatch) => {
					    axios.get(url).then(function(res){
					        const action = func(res.data)
					        dispatch(action)
					    })
					}
				3.生成action，并发送action
			
		
		2.redux-saga
			优点：
				1.异步解耦: 异步操作被被转移到单独 saga.js 中，不再是掺杂在 action.js 或 component.js 中
				3.异常处理:，代码异常/请求失败 都可以直接通过 try/catch 语法直接捕获处理
				4.功能强⼤: 提供了⼤量的Saga 辅助函数和Effect 创建器供开发者使⽤
				5.灵活: 可以将多个Saga可以串⾏/并⾏组合起来,形成⼀个⾮常实⽤的异步流
				6.易测试，提供了各种case的测试⽅案，包括mock task，分⽀覆盖等等
			缺点：
				1.额外的学习成本: redux-saga不仅在使⽤难以理解的 generator function,⽽且有数⼗个API,学习成本远超redux-thunk,最重要的是你的额外学习成本是只服务于这个库的,与redux-observable不同,redux-observable虽然也有额外学习成本但是背后是rxjs和⼀整套思想
				2.体积庞⼤: 体积略⼤,代码近2000⾏，min版25KB左右
				3.功能过剩: 实际上并发控制等功能很难⽤到,但是我们依然需要引⼊这些代码
				4.ts⽀持不友好: yield⽆法返回TS类
				
			使用步骤
				1.配置中间件
				
					import {createStore, applyMiddleware, compose} from 'redux';
					import reducer from './reducer';
					import createSagaMiddleware from 'redux-saga'
					import TodoListSaga from './sagas'

					const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
					const sagaMiddleware = createSagaMiddleware()

					const enhancer = composeEnhancers(
					  applyMiddleware(sagaMiddleware)
					);

					const store = createStore(reducer, enhancer);
					sagaMiddleware.run(TodoListSaga)
			
export default store;
				2.将异步请求放在sagas.js中
					import {takeEvery, put} from 'redux-saga/effects'
					import {initTodoList} from './actionCreator'
					import {GET_INIT_ITEM} from './actionTypes'
					import axios from 'axios'
					
					function* func(){
					    try{
					        // 可以获取异步返回数据
					        const res = yield axios.get('/getData')
					        const action = initTodoList(res.data)
					        // 将action发送到reducer
					        yield put(action)
					    }catch(e){
					        console.log('网络请求失败')
					    }
					}
					
					function* mySaga(){
					    // 自动捕获GET_INIT_ITEM类型的action，并执行func
					    yield takeEvery(GET_INIT_ITEM, func)
					}
					
					export default mySaga
					
				3.发送action
					componentDidMount(){
					  const action = getInitTodoItemAction()
					  store.dispatch(action)
					}

#### Redux 怎么实现属性传递，介绍下原理
	react-redux 数据传输∶ view-->action-->reducer-->store-->view。看下点击事件的数据是如何通过redux传到view上：
	
#### Redux 中间件是什么？接受几个参数？柯里化函数两端的参数具体是什么？
	Redux 的中间件提供的是位于 action 被发起之后，到达 reducer 之前的扩展点
	export default function applyMiddleware(...middlewares) {
	    return createStore => (...args) => {
	        // 利用传入的createStore和reducer和创建一个store
	        const store = createStore(...args)
	        let dispatch = () => {
	            throw new Error()
	        }
	        const middlewareAPI = {
	            getState: store.getState,
	            dispatch: (...args) => dispatch(...args)
	        }
	        // 让每个 middleware 带着 middlewareAPI 这个参数分别执行一遍
	        const chain = middlewares.map(middleware => middleware(middlewareAPI))
	        // 接着 compose 将 chain 中的所有匿名函数，组装成一个新的函数，即新的 dispatch
	        dispatch = compose(...chain)(store.dispatch)
	        return {
	            ...store,
	            dispatch
	        }
	    }
	}

	从applyMiddleware中可以看出∶

	redux中间件接受一个对象作为参数，对象的参数上有两个字段 dispatch 和 getState，分别代表着 Redux Store 上的两个同名函数。
	柯里化函数两端一个是 middewares，一个是store.dispatch
	
#### Redux 请求中间件如何处理并发
	使用redux-saga创建 Sagas 将所有异步操作逻辑存放在一个地方进行集中处理，以此将react中的同步操作与异步操作区分开来，以便于后期的管理与维护
	redux-saga如何处理并发：
	1.takeEvery  可以让多个 saga 任务并行被 fork 执行。
		import {
		    fork,
		    take
		} from "redux-saga/effects"
		
		const takeEvery = (pattern, saga, ...args) => fork(function*() {
		    while (true) {
		        const action = yield take(pattern)
		        yield fork(saga, ...args.concat(action))
		    }
		})
	2.takeLatest
		takeLatest 不允许多个 saga 任务并行地执行
			一旦接收到新的发起的 action，它就会取消前面所有 fork 过的任务
			import {
			    cancel,
			    fork,
			    take
			} from "redux-saga/effects"
			
			const takeLatest = (pattern, saga, ...args) => fork(function*() {
			    let lastTask
			    while (true) {
			        const action = yield take(pattern)
			        if (lastTask) {
			            yield cancel(lastTask) // 如果任务已经结束，则 cancel 为空操作
			        }
			        lastTask = yield fork(saga, ...args.concat(action))
			    }
			})

#### Redux 状态管理器和变量挂载到 window 中有什么区别
	两者都是存储数据以供后期使用。但是Redux状态更改可回溯——Time travel，数据多了的时候可以很清晰的知道改动在哪里发生，完整的提供了一套状态管理模式。
	
#####  mobox 和 redux 有什么区别？
	1.共同点
		1.为了解决状态管理混乱，无法有效同步的问题统一维护管理应用状态;
		2.某一状态只有一个可信数据来源（通常命名为store，指状态容器）;
		3.操作更新状态方式统一，并且可控（通常以action方式提供更新状态的途径）;
		4.支持将store与React组件连接，如react-redux，mobx- react;
	2.区别 Redux更多的是是一个 JavaScript库，它关注点主要是以下几方面∶
		1.Action∶ 一个js对象，描述动作相关信息，主要包含type属性和payload属性∶
		2.Reducer∶ 定义应用状态如何响应不同动作（action），如何更新状态
		3.Store∶ 管理action和reducer及其关系的对象，主要提供以下功能∶
				o 维护应用状态并支持访问状态(getState());
				o 支持监听action的分发，更新状态(dispatch(action)); 
				o 支持订阅store的变更(subscribe(listener));
		4.异步流
		
	对比总结：
		1.redux将数据保存在单一的store中，mobx将数据保存在分散的多个store中
		3.redux使用不可变状态，这意味着状态是只读的，不能直接去修改它，而是应该返回一个新的状态，同时使用纯函数;mobx中的状态是可变的，可以直接对其进行修改
		
#### Redux 和 Vuex 有什么区别，它们的共同思想
	区别
		1.Vuex改进了Redux中的Action和Reducer函数，以mutations变化函数取代Reducer，无需switch，只需在对应的mutation函数里改变state值即可
		2.Vuex由于Vue自动重新渲染的特性，无需订阅重新渲染函数，只要生成新的State即可
		3.Vuex数据流的顺序是∶View调用store.commit提交对应的请求到Store中对应的mutation函数->store改变（vue检测到数据变化自动渲染）
		
	共同思想
		1.单—的数据源
		2.变化可以预测
		
####  Redux 中间件是怎么拿到store 和 action? 然后怎么处理?

####  Redux中的connect有什么作用
	connect负责连接React和Redux
		1.获取state
			connect 通过 context获取 Provider 中的 store，通过 store.getState() 获取整个store tree 上所有state
			
		2.包装原组件
			把 connect 中传入的 mapStateToProps，mapDispatchToProps与组件上原有的 props合并后，通过属性的方式传给WrappedComponent
			
		3.监听store tree变化
			connect缓存了store tree中state的状态，通过当前state状态 和变更前 state 状态进行比较，从而确定是否调用 this.setState()方法触发Connect及其子组件的重新渲染
			
#### 对React Hook 的理解，它的实现原理是什么
	函数组件就真正地将数据和渲染绑定到了一起。函数组件是一个更加匹配其设计理念、也更有利于逻辑拆分与重用的组件表达形

#### 类组件和函数组件的区别
	1.类组件需要继承 class，函数组件不需要；
	2.类组件可以访问生命周期方法，函数组件不能；
	3.类组件中可以获取到实例化后的 this，并基于这个 this 做各种各样的事情，而函数组件不可以；
	4.类组件中可以定义并维护 state（状态），而函数组件不可以；
	
#### 为什么 useState 要使用数组而不是对象
	1.如果 useState 返回的是数组，那么使用者可以对数组中的元素命名，代码看起来也比较干净
	2.如果 useState 返回的是对象，在解构对象的时候必须要和 useState 内部实现返回的对象同名，想要使用多次的话，必须得设置别名才能使用返回值
	
####  React Hooks 解决了哪些问题？
	1.在组件之间复用状态逻辑很难
		使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用
	2.复杂组件变得难以理解
		Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据），而并非强制按照生命周期划分
	3.难以理解的 class
		Hook 使你在非 class 的情况下可以使用更多的 React 特性
		
#### React Hook 的使用限制有哪些？
	1.不要在循环、条件或嵌套函数中调用 Hook；
		因为 Hooks 的设计是基于数组实现。在调用时按顺序加入数组中，如果使用循环、条件或嵌套函数很有可能导致数组取值错位，执行错误的 Hook
	2.使用useState时候，使用push，pop，splice等直接更改数组对象的坑
	
#### useEffect 与 useLayoutEffect 的区别
	useEffect 是异步执行的，而useLayoutEffect是同步执行的。
	useEffect 的执行时机是浏览器完成渲染之后，而 useLayoutEffect 的执行时机是浏览器把内容真正渲染到界面之前，和 componentDidMount 等价。
	
#### React Hooks在平时开发中需要注意的问题和原因
	