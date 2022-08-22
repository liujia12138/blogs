#### 1.vue的双向绑定数据原理：
    采用数据劫持结合发布者-订阅者模式的方式。通过Object.defineProperty()来劫持各个属性的setter，getter。在数据变动时发布消息给订阅者，触发响应的监听回调
    具体步骤：
      （1）需要observe的数据对象进行递归遍历，包括子属性对象的属性，都加上setter，getter函数，这样的话如果我们给这个对象赋值就会出发setter，那么就能监听他的数据变化
      （2）complie解析模版指令，将模版中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动就会收到通知，更新视图
      （3）watcher订阅者是observer和complie之前通信的桥梁，主要做的事情就是：
          在自身实例化时向订阅器 中添加自己
          自身必须有一个update方法
          当属性变动接到通知时，就能够调用自身的update方法，并触发compile之间的绑定回调
	  （4）mvvm作为数据绑定的入口，整合observer，complie，wather三者，通过observer来监听自己model的数据的变化，complie来解析模版指令，最终利用wather搭建桥梁达到数据变化->视图更新;视图交互变化->数据model变更
#### 2.解释单项数据流和双向数据绑定
*     单项数据流：顾名思义，数据流是单项的。数据流动方向可以跟踪，流向单一，追查问题的时候可以更快捷。缺点就是写起来不太方便，要是UI发生变更就必须创建各种action来修改对应的state；
*     双向数据绑定：数据之间是相通的，将数据绑定的操作隐藏在框架内，优点是在表单交互较多的场景下，会简化与业务无关的代码，缺点就是无法追踪局部状态的变化。
*     
#### Vue如何去除url中的#？
  vue-router中默认使用hash模式，\所以在路由加载的时候，项目中的url就会自带#，如果不想使用#，可以使用vue-router的history模式；
  hash模式：前端路由的原理：window是可以监听到hash值的变化（onhashchange事件），也就是说当url中的hash值发生变化的时候，无需发起http请求，window也是可以监听到这种变化的，并按需加载对应的前端代码块，强大之处在于：路由发布不需要服务端来做，前端就可以自己完成。
  history模式：当用户输入一个url时，是由服务器在接受用户的这个输入请求，并由服务其解析url的路径然后作出对应的逻辑处理
#### vue-router如何实现懒加载？
	1、ES6的import()方法，按需加载
		components：（） => import();
	2、vue的异步组件，require()方法，按需加载
		component:resolve => require([''],resolve);
	3、vue组件的异步+webpack中的ensure()方法
		component:r => require.ensure([],() => r(require('')),'hello')
		
#### 对MVC、MVVM的理解
  MVC:view传送指令到controller--->controller完成业务逻辑之后，要求model改变状态---->model将数据发送给view之后，用户得到反馈
  MVVM:view的变动，会自动反映在viewmodel上面；
    MVVM分别为model，view，viewmodel三者
    model代表数据模型，数据与业务逻辑都在model层定义
    view代表ui视图，负责数据的显示
    viewmodel负责监听model中数据的改变并控制视图的更新，处理用户交互操作
    model和view并无直接关联，而是通过viewmodel来进行联系的，model和viewmodel之间有这双向数据绑定的联系。因此model的改变会触发view层的更新，view中由于用户交互操作而改变数据也会同步到model中，这种模式就实现了model和view的数据同步

#### vue生命周期的理解
  beforeCreated:在实例创建之前执行的，数据未加载的状态；
  created：在实例创建，数据加载之后，能出初始化你数据，dom渲染完成之前执行
  berforeMount：虚拟dom已经创建完成，在数据渲染前做最后一次数据更改
  mounted:页面、数据已经渲染完成，真实dom挂载完成
  beforeUpdate重新渲染之前触发
  update数据已经更改完成，dom也重新render完成，更改数据回会陷入死循环中
  beforeDestory销毁会前可执行
  destoryed销毁后执行
#### 什么是vue的生命周期？
	vue实例从创建到销毁的过程，就是生命周期。从开始创建，初始化数据，编辑模版，挂载dom->渲染、更新->渲染，销毁等一系列过程，称之为生命周期。
	
#### vue绑定class的几种方式？
  对象语法：
    1.给v-bind:class设置一个对象，可以动态的切换class；
    2.对象中也可以传入多个属性，来动态切换class；
    3.当class 的表达式过长或者是逻辑过于复杂的，还可以绑定一个计算属性，
  数组语法：

#### 组件之间通信使用的场景？
	场景一：父子通信
		props/$emit;$parent/$children;ref也可以访问组件的实例；
	场景二：兄弟通信
		eventBus；store；
	场景三：跨级通信
		eventbus，store，$attrs/$listeners;

#### vue中key的作用？
	当vue.js用v-for正在更新已经渲染过的元素时，默认使用“就地复用”的原则，如果数据项的顺序被改变，vue将不会移动dom元素来匹配数据项的顺序，而是简单复用此处每个元素，并且确保他在特定索引显示已被渲染过的每一个元素，key的作用时为了高效的更新虚拟dom；


#### nextTick是做什么的
  $nextTick是在下次Dom更新循环结束之后延迟回调，修改数据之后使用$nextTick,则可以再回调中获取更新后的DOM

#### Vue组件data为什么必须是函数
  因为js本身的特性决定的，如果data是一个对象，那么由于对象本身属于引用类型，当我们修改其中的一个属性时会影响到所有的vue实例数据。如果data是一个函数并放回出一个对象，那么每一个实例的data属性就是独立的，不会相互影响 
#### 什么是vue的计算属性？
	好处：
		1、使数据处理结构清晰
		2、依赖于数据，数据更新，处理结果自动更新；
		3、计算属性内部this，指向vue实例；
		4、在template调用时，直接写计算属性名即可；
		5、相比较methods来说，不管以来数据变不变，methods都会重新计算，但是以来数据不变的情况下，computed会从缓存中取结果；
#### 计算属性computed和事件methods有什么区别？
  computed：计算属性是基于他们的依赖来进行缓存的，只有他的相关属性发生改变的时候，才会重新计算求值
  methods：只要发生重新渲染，就会执行该函数
  watch：监听某一个值，只有这个值发生变化的时候才会执行对应的操作

  watch更加适用于监听某一个值发生变化并做出相应的操作，而computed适用于计算已经存在的值并返回结果
#### $route和$router的区别
  $router为vue-router的实例，想要导航到不同的url上，这是用$router.push;
  $route为当前router跳转对象里面可以获取name,path,query,params
#### vue中怎么使用自定义指令
  全局自定义指令：vue.directive('focus',{
    inserted:function(el,binding){
      el.focus();
    }
  })

  局部自定义指令：directives:{
    focus:{
      inserted:function(el){
        el.focus();
      }
    }
  }

  其中bind和inserted：
    共同点：dom插入时都会调用，bind在inserted之前调用
    不同点：
        （1）bind时父节点为null
        （2）inserted时父节点存在
        （3）bind是在dom树绘制前调用的，inserted在dom树绘制之后调用

    自定义指令的钩子里面没有vue实例，this指向undefined；

#### keep-alive?
	keep-alive用来保存组件的渲染着状态的；
	keep-alive的生命周期：
		初次进入：created->mounted->activated,退出后触发deactiveted；
		再次进入：会触发activted，事件挂载等方法，只一次放在mounted里面，组件每次进入的方法放在activted里面
	如何清空无用的缓存？
		假设两个A、B两个页面全部都有缓存，
		（1）假如第一次进入A页面后退出，再次进入页面时，页面不会刷新。这和目前的逻辑不相符合，我们想要的结果是A页面前进后返回，页面保持不变，而不是退出后重新进入保持不变。
		（2）在进入过A页面后进入B页面，经测试后发现，B页面竟然会显示A页面的缓存，尽管url已经变化。
		为了解决这个问题，需要判断页面是在前进还是后退，在beforeEach钩子中添加代码：
			let toDepth = to.path.split('/').length;
			let fromDepth = from.path.split('/').length;
			if(toDepth < fromDepth){
				from.meta.keepAlive = false;
				to.meta.keepAlive = ture;
			}
#### v-if和v-show的性能消耗？
	v-if有较高的切换性能消耗，v-show有较高的初始性能消耗
#### vue-loader是什么？
	基于webpack的一个loader，解析和转换.vue文件，提取其中的逻辑代码script，样式代码style，以及html模版template，在分别把他们交给对应的loader去处理，核心作用就是提取。
	#### vue.use的原理？
  用法：vue安装的组件类型必须是function或者是object；
  如果是个对象，必须提供install方法；
  如果是个函数，会被直接当做install函数执行；

vue提供的插件注册机制很简单，每个插件都需要实现一个静态的方法install，当我们执行vue.use注册插件的时候，就会执行install这个方法，并且在这个install方法的第一个参数我们可以拿到vue对象，这样的好处就是作为插件的编写方法不需要额外的去import vue了；

#### vue中怎么自定义过滤器
  可以用全局的方法vue.filter()注册一个自定义过滤器，他接受两个参数：过滤器ID和过滤函数。过滤器函数以值为参数，返回转换后的值

  vu.filter('reserve',(val) => {
    return val.split(',').reserve().join('')
  })
  
#### vue等单页应用的优缺点？
  优点：良好的交互体验、良好的前后端分离模式、减轻服务器的压力
  缺点：seo的难度高、初次加载耗时多

#### vue-router有哪几种导航钩子？
  1.全局导航钩子：router.beforeEach(),router.afterEach()
 <!-- 2.组件内的钩子：beforeCreated（），created（），beforeMount（），Mounted（），beforeUpdate（），update（），beforeDestory（），destoryed（）； -->
  3.单独路由独享组件钩子：beforeEnter
  4.组件级钩子：beforeRouteEnter，beforeRouteUpdate，beforeRouteLeave

#### vue中如何在url上面传值？
	1.直接在path后面添加简单的动态参数，可以用this.$router.params来获取；
	2.在标签内容中添加，如果使用path，则只能使用query，如果使用params，则只能使用name；
#### vuex是什么？怎么使用？那种场景使用他？
  vuex是状态管理器，帮助我们管理共享状态，也就是管理全局变量；
  state：存储状态，也就是变量
  getters：派生状态，也就是set，get中的get，和vue的computed差不多
  mutations：提交状态修改，不支持异步操作，第一个参数默认为state，外部调用方式为this.store.commit('方法名‘，参数)
  actions：支持异步操作，第一个参数默认为是和store具有相同属性的对象，外部调用方式为this.store.dispatch('方法名'，参数)
  modules：store的子模块，内容就相当于是store的一个实例，调用方法和前面介绍的相似，只要加上当前子模块名就可以

#### vue中的mixin和extend的区别？
    mixins为全局注册混合对象，会影响到所有之后创建的vue实例
    vue.extend是对单个实例进行扩展
    mixins：混合对象的钩子将在组件自身钩子之前调用，meothods，componets，directives将被混合为同一个对象，两个对象的键名冲突时，取组件（而非mixins）对象的键值对；

#### vue-router的实现原理？
  单页面的原理：js会感知url的变化，通过这一点，可以用js动态的将当前页面的内容清除掉，然后将下一个页面的内容挂靠在当前页面，也可以判断当前页面中的某血元素是否显示或者是隐藏，这样每次跳转就不需要请求新的html文件
  原理就是更新视图并不请求新的页面
  
  
#### 指令定义函数提供了几个钩子函数(可选)：
	1. bind：只调用一次，指令第一次绑定到元素时调用，可以定义一个在绑定时执行一次的初始化动作；
	2. inserted：被绑定元素插入父节点时调用（父节点存在即可调用，不必存在与document中）；
	3. update:被绑定元素所在模版更新时调用，而不论绑定绑定值是否发生变化。通过比较更新前后的绑定值。
	4. componentUpdated:被绑定元素所在模版完成一次更新周期时调用；
	5. unbind：只调用一次，指令与元素解绑时调用。
	
#### v-el的作用？
	提供一个在页面行已经存在 DOM元素作为vue实例挂载的目标

#### Vuex解决了什么问题？
	1.多个组件依赖于同一状态时，对于多层嵌套的组件的传参将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。
	2.来自不同组件的行为需要变更同一状态。
	
#### Vuex中要从state派生一些状态出来，且多个组件使用它，该怎么做，？
	使用getter属性，相当Vue中的计算属性computed，只有原状态改变派生状态才会改变。
	getter接收两个参数，第一个是state，第二个是getters(可以用来访问其他getter)。
		const store = new Vuex.Store({
			state: {
				price: 10,
				number: 10,
				discount: 0.7,
			},
			getters: {
				total: state => {
					return state.price * state.number
				},
				discountTotal: (state, getters) => {
					return state.discount * getters.total
				}
			},
		});
		
	然后在组件中可以用计算属性computed通过this.$store.getters.total这样来访问这些派生转态。
	
#### 怎么在组件中批量给Vuex的getter属性取别名并使用
	使用mapGetters辅助函数, 利用对象展开运算符将getter混入computed 对象中
	import {mapGetters} from 'vuex'
	export default{
		computed:{
			...mapGetters({
				myTotal:'total',
				myDiscountTotal:'discountTotal',
			})
		}
	}
	
#### 在组件中多次提交同一个mutation，怎么写使用更方便。
	使用mapMutations辅助函数,在组件中这么使用
	import { mapMutations } from 'vuex'
	methods:{
		...mapMutations({
			setNumber:'SET_NUMBER',
		})
	}
	然后调用this.setNumber(10)相当调用this.$store.commit('SET_NUMBER',10)
	
#### 在模块中，getter和mutation和action中怎么访问全局的state和getter？ 
	1.在getter中可以通过第三个参数rootState访问到全局的state,可以通过第四个参数rootGetters访问到全局的getter。
    2.在mutation中不可以访问全局的satat和getter，只能访问到局部的state。
    3.在action中第一个参数context中的context.rootState访问到全局的state，context.rootGetters访问到全局的getter。

#### 怎么在带命名空间的模块内提交全局的mutation和action？
	将 { root: true } 作为第三参数传给 dispatch 或 commit 即可。
	this.$store.dispatch('actionA', null, { root: true })
	this.$store.commit('mutationA', null, { root: true })
#### 怎么在带命名空间的模块内注册全局的action？
	actions: {
	    actionA: {
	        root: true,
	        handler (context, data) { ... }
	    }
	  }
	  
#### 在Vuex插件中怎么监听组件中提交mutation和action？
	用Vuex.Store的实例方法subscribe监听组件中提交mutation
	用Vuex.Store的实例方法subscribeAction监听组件中提交action 在store/plugin.js文件中写入
	export default function createPlugin(param) {
    return store => {
        store.subscribe((mutation, state) => {
            console.log(mutation.type)//是那个mutation
            console.log(mutation.payload)
            console.log(state)
        })
        // store.subscribeAction((action, state) => {
        //     console.log(action.type)//是那个action
        //     console.log(action.payload)//提交action的参数
        // })
        store.subscribeAction({
            before: (action, state) => {//提交action之前
                console.log(`before action ${action.type}`)
            },
            after: (action, state) => {//提交action之后
                console.log(`after action ${action.type}`)
            }
        })
    }
}

#### 如何解决vue打包vendor过大的问题？
	解决方案：将引用的外部 js、css 文件剥离出来，不编译到 vendor.js 中，而是用资源的形式引用，这样浏览器可以使用多个线程异步将 vendor.js、外部的 js 等加载下来，达到首次打开加速的目的。
	1.分析打包文件
		首先引入webpack-bundle-analyzer插件，分析打包后的vendor
		在vue.config.js文件中的chainWebpack配置插件，默认会在8888端口打开
		ingoreConfig（）
	2. 在 bulid/webpack.base.conf.js 文件中，增加 externals，将引用的外部模块导入，如下：
在这里插入图片描述
	3.去掉原有的引用
	
#### vue的开发规范
	js:
		1.去掉和渲染无关的数据
		2.debounce使用
		3.图片压缩问题，除非特别要求图片必须高质量的显示，否则都应该进行对应的压缩处理
		4.使用正确的生命周期
		5.data数据层级
		6.策略模式的使用，避免过多的if else判断，也可以替代简单逻辑的switch
		7.解构
		8.函数的职责尽量单一
	html
		尽量使用eslint
	css 
		1.样式穿透
		2.层级嵌套不要过深
		
#### this.$set的原理
	在使用this.$set(target, key, value)时，target为需要添加属性的对象，key是要添加的属性名，value为属性key对应的值
	1.如果是在开发环境，且target未定义（为null、undefined）或target为基础数据类型（string、boolean、number、symbol）时，抛出告警；
	
	2、如果target为数组且key为有效的数组key时，将数组的长度设置为target.length和key中的最大的那一个，然后调用数组的splice方法（vue中重写的splice方法）添加元素；
	
	3、如果属性key存在于target对象中且key不是Object.prototype上的属性时，表明这是在修改target对象属性key的值（不管target对象是否是响应式的，只要key存在于target对象中，就执行这一步逻辑），此时就直接将value直接赋值给target[key]；
	
	4、判断target，当target为vue实例或根数据data对象时，在开发环境下抛错；
	
	5、当一个数据为响应式时，vue会给该数据添加一个__ob__属性，因此可以通过判断target对象是否存在__ob__属性来判断target是否是响应式数据，当target是非响应式数据时，我们就按照普通对象添加属性的方式来处理；当target对象是响应式数据时，我们将target的属性key也设置为响应式并手动触发通知其属性值的更新；
		