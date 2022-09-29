# Vue

## Vue

### vue基础

- 基础知识

	- 为什么data要写成函数而不是一个对象？

		- 因为组件可能会被实例化多次，如果data是一个对象的话，所有的实例都会使用同一个数据对象从而导致数据混乱。而使用函数返回一个对象可以保证每个实例都拥有独立的数据对象。

- 双向数据绑定的原理

	- vue的双向数据绑定，是通过数据劫持+发布订阅模式实现的。
数据劫持通过Object.defineProperty的setter和getter对属性的修改和读取进行劫持，在数据变动时，发布消息给订阅者，触发相应的监听回调。
具体步骤：
1. 需要observe的数据对象进行递归遍历，包括子属性对象的属性，都加上setter和getter函数，这样的话我们每次给这个属性赋值就会触发setter
2. complie解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点更新数据，添加监听数据的订阅者，一旦数据变化就会收到通知，更新视图
3. 

- mvvm、mvc、mvp的区别
- 插值指令
- 自定义指令

	- 1. 注册全局指令  Vue.directive()
2. 注册局部指令，directives选项
	- Vue.directive接受两个参数，第一个参数是指令名称，第二个参数可以是一个回调函数或一个配置对象

		- 函数简写，只传一个回调函数的话就是在指令与元素成功绑定时和模板重新解析时调用，即bind和update

	- 钩子函数：一个指令定义对象可以提供如下几个钩子：
bind：指令与元素绑定成功时调用，只会调用一次，相当于初始化的设置
inserted：被绑定元素插入父节点时调用
update：所在组件的VNode更新时调用，即模板重新解析时
componentUpdated：指令所在组件的VNode及其子VNode全部更新后调用
unbind：指令与元素解绑时

		- 钩子函数参数：
el：指令所绑定的元素，可以用来直接操作DOM；
binding：一个对象，包含以下property
    name：指令名，不包含v-前缀；
    value：指令的绑定值
    oldValue：指令绑定的前一个值，仅在update和componentUpdated钩子中
    express：字符串形式的指令表达式
    arg：传给指令的参数，可选， 例如在v-my-directive:foo，参数为foo
    modifiers：一个包含修饰符的对象，例如v-my-directive.foo.bar中，修饰符对象是{foo: true, bar: true}
vnode：虚拟节点
oldVnode：上一个虚拟节点

- computed、watch、methods

	- computed，计算属性，因为模板内放入太多的逻辑会让模板过重且难以维护，对于复杂的逻辑我们应该使用计算属性

		- 好处：
	1、使数据处理结构清晰
	2、依赖于数据，数据更新，处理结果自动更新；
	3、计算属性内部this，指向vue实例；
	4、在template调用时，直接写计算属性名即可；
	5、相比较methods来说，不管以来数据变不变，只要触发重新渲染，methods都会重新计算；但是在依赖数据不变的情况下，computed会从缓存中取结果；

	- watch，侦听属性，当需要在数据变化时执行异步或者开销较大的操作时，需要用到watch，需要注意的是计算属性内不支持异步。
	- methods，方法

- 条件渲染 v-if 和v-show

	- v-if是真正的条件渲染，因为他会确保在切换过程中dom会被销毁和重建。

v-if是惰性的，如果在初始渲染时条件为false，则什么都不做，知道条件变为true时才进行渲染条件块。
相比较之下，v-show就简单得多，不管初始条件是true还是false，元素都会被渲染，条件切换只是简单的css切换。

	- 总结：v-if切换的开销更高，而v-show只有初始渲染开销较高，对于需要频繁切换的场景下用v-show，在运行时条件很少改变，则使用 v-if 较好。

- 列表渲染v-for

	- v-for可以用来渲染列表和对象，遍历对象时，可以提供三个参数，第一个参数是键值，第二个参数是键名，第三个参数是索引。
	- v-for渲染列表时。默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue不会移动DOM元素来匹配数据项的顺序，而是就地更新每一个元素，并且确保他们在每一个索引位置正确渲染。
	- 为了给Vue一个提示，以便于他能跟踪每一个节点的身份，从而更高效的重用和重新排序现有的元素，最好给每一个元素提供一个唯一的key属性，除非遍历输出的DOM内容非常简单，或者是刻意依赖默认行为以获取性能上的输出

- key的作用 虚拟DOM

	- 1. 虚拟DOM中 key的作用
key是虚拟DOM中对象的标识，当数据发生变化时，vue会根据新数据生成新的虚拟DOM，随后Vue内部会进行新的虚拟DOM和旧的虚拟DOM 的差异对比

		- 对比规则：
从旧的虚拟DOM 中找到与新的虚拟DOM key值相同的，如果虚拟DOM中内容没有发生变化，则直接使用之前的真实DOM；如果虚拟DOM中发生了变化，则生成新的真实DOM，然后替换掉页面之前的真实DOM；
如果没有再旧的虚拟DOM中找到具有相同值的Vnode，则直接创建新的真实DOM然后渲染到页面上。

	- 2. 使用index作为key会有什么问题？

		- 若对数据进行：逆序添加、逆序删除等破坏原有顺序的操作，会产生没有必要的真实 DOM 更新，页面效果没有问题，但是效率低（因为对数据的顺序进行了改变，导致没有发生变化的数据在渲染时也无法使用之前的真实DOM）
如果结构中还包含了输入类的 DOM，如 input，会产生错误的 DOM 更新，导致页面有问题，如：

- vue绑定class的几种方式

	- <!-- 字符串写法：适用于class不确定，需要动态指定 -->
<div class="basic" :class="mode">class</div>

<!-- 数组写法：适用于要绑定的class个数不确定，名字也不确定 -->
<div class="basic" :class="classArr">数组写法</div>

<!-- 对象写法：适用于绑定的class个数确定、名字也确定，但是不确定用不用 -->
<div class="basic" :class="classObj">对象写法</div>

- 过滤器 filter的作用？如何实现一个过滤器？

	- 过滤器可以用于一些常见的文本格式化， 可以用在两个地方，双花括号和v-bind表达式，和变量之间 用管道符

定义局部过滤器，在组件选项中定义
filters:{
  formatter(value
}

- 事件绑定

	- 如何绑定事件？v-on:事件名 简写  @事件名

- 常见的事件修饰符及其作用

	- 事件修饰符：
 prevent：阻止默认事件
 stop：阻止事件冒泡
 once：事件只触发一次
 capture：使用事件的捕获模式
 self：只有event.target是当前操作的元素，才触发
 passive：事件的默认行为立即执行，无需等待事件回调执行完毕

- 混入 mixin

	- vue的mixins选项接受一个混入对象的数组，这些选项会被合并到最终的选项中去，合并逻辑和Vue.extend()相同，如果混入中包含了created钩子，而创建组件本身也有一个，那么这两个钩子函数都会被调用，且混入的钩子会在组件自身钩子之前调用
	- 当选项发生冲突时，会取组件数据

- $nextTick的作用及原理

	- 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。

- $refs

	- ref属性，用来给元素或者子组件注册引用信息，引用信息将会注册在父组件的$ref对象上。如果用在普通的dom元素上，引用指向就是dom元素；如果用在子组件上，引用就指向组件实例
	- 子组件ref，在父组件中可以通过$refs访问子组件实例或子元素，

- 生命周期
- 组件传参  父传子、子传父、兄弟组件、子孙组件

	- 1. props/$emit
	- 2. 事件总线 eventBus
	- 3. 依赖注入 provide/inject

		- 当我们想要给子孙节点传递参数时，使用props、$paren这种方法无法很好的扩展到更深层级的嵌套上，这时就需要用到依赖注入provide、inject了。

			- provide选项允许我们指定想要提供给后代组件的数据和方法
provide(){
  return {
     detail: this.detail
  }
}

在任何后代组件中，我们都可以使用inject选项来指定接受我们想要的值：
inject:['detail']
			- 需要注意的是，provide提供的参数，是非响应式的，除非provide函数内直接返回祖先组件的this。

	- 4. ref/$refs
	- 5. vuex
	- 6. 访问根实例/父级组件

		- $root、$parent

- 插槽

	- 具名插槽

		- 定义插槽：
<header><slot name="header"></slot></header>

使用插槽：
<header><template slot="header">xxxxx....</template></header>

	- 作用域插槽

		- <span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
如果想替换掉上面插槽内默认的user.lastName，需要在使用插槽时读取到user的数据，这个时候可以通过v-bind来给插槽提供一个prop
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>


- 状态管理

	- 简单状态管理的使用

		- 当我们访问数据对象时，一个vue实例只是简单的代理访问，如果有一处需要被多个实例共享的状态，可以通过维护一份挂载在vue实例上的数据来实现共享
		- var sourceOfTruth = {}

var vmA = new Vue({
  data: sourceOfTruth
})

var vmB = new Vue({
  data: sourceOfTruth
})


			- 当sourceOfTruth发生变更，vmA和vmB都将自动更新他们的视图。子组件们的每一个实例也会通过this.$root.$data去访问，但是这样做会发现在数据变更后不会留下变更过的记录，会让调试变得非常麻烦。

	- store模式

		- var store = {
  debug: true,
  state: {
     message: 'hello'
   },
   setMessageAction(newValue){
      if(this.debug) console.log('setMessageAction triggered with', newValue)
      this.state.message = newValue
   },
   clearMessageAction () {
       if (this.debug) console.log('clearMessageAction triggered')
       this.state.message = ''
   }
}
		- 需要注意的是，store中state的变更，都放置在store自身的action中去管理。组件不允许直接变更属于store实例的state，而应该执行action来分发(dispatch)事件通知store去变更。

- keep-alive有什么作用？是如何实现的？
- assets和static的区别？

	- 1.使用时路径的区别：static中的文件使用绝对路径，assets中的文件使用相对路径
2.编译的区别:static中的文件不会经过webpack编译直接复制到dist目录中，assets中的文件会经过webpack编译

### vue生态

- VueRouter

	- hash和history模式的区别
	- $route和$router的区别？

		- $router为vue-router的实例，想要导航到不同的url上，这时用$router.push;
		- $route为当前router跳转对象，里面可以获取name,path,query,params

	- 命名视图？
	- 路由传参：将props传递给路由组件

		- 当路由的props参数设置为true时，route.params将会被设置为组件的参数
		- 对于有命名视图的路由，需要给每一个命名视图定义props配置
		- 当props是一个对象时，它将原样设置为组件的props
		- 函数模式，可以创建一个返回props的函数，

			- const routes = [
  {
    path: '/search',
    component: SearchUser,
    props: route => ({ query: route.query.q })
  }
]

	- params和query的区别

		- params：路径参数，比如一个path为/user/:username 的路由，/user/tom和/user/jerry 会被映射到同一个路由上

路径参数用冒号:  表示，当一个路由被匹配时，他的params将会在每个组件中以this.$route.params的形式暴露出来。

同一个路由中可以设置多个路径参数

需要注意的是，使用$router进行路由跳转时，如果提供了path，params将会被忽略。我们应该使用路由的name和params或者直接将参数拼接到path上提供完整的url。
		- query，url参数，会以?key=value的形式拼接在path后面

	- 路由嵌套
	- 导航守卫有哪些？导航守卫可以分为全局守卫和路由独享的守卫和组件内的守卫

		- 全局

			- 全局前置守卫：router.beforeEach

				- 接收两个参数，to：即将要进入到的目标，from：即将要离开的路由；
				- 返回值：
1. 返回false，表示取消当前导航
2. 返回一个路由地址，就像使用router.push一样
				- 可选的第三个参数：next

			- 全局解析守卫：router.beforeResolve

				- 和beforeEach类似，每次导航都会被触发，但是确保在导航被确认之前，同事在所有组件内守卫和异步路由组件被解析后，解析守卫就被正确调用

			- 全局后置钩子：router.afterEach

				- 和守卫不同的是，后置钩子不会接受next函数，也不会改变导航本身，它主要是用于分析、更改页面标题、声明页面等辅助功能。
				- afterEach也接收to和form两个参数，同时可以接收第三个参数：failure用来处理失败的情况

		- 路由独享的守卫

			- 直接在路由配置上定义beforeEnter

				- beforeEnter只有在进入路由时会触发，params、query和hash的改变都不会触发beforeEnter，
				- 可以将一个函数数组传递给beforeEnter，这在为不同的路由重用守卫时很有必要。

					- const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: [removeQueryParams, removeHash],
  },
  {
    path: '/about',
    component: UserDetails,
    beforeEnter: [removeQueryParams],
  },
]

		- 组件内的守卫

			- beforeRouteEnter

				- 1. 在渲染该组件的对应路由被验证前调用
2. 不能获取当前组件实例的this，因为在beforeRouteEnter调用时，组件还没有被创建
3. 虽然不能访问到this，但是可以通过传一个回调给next来访问组件实例，回调会在导航被确认的时候执行，并且把组件实例作为回调函数的参数

					- beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}

			- beforeRouteUpdate

				- 1. 当前路由改变，但是该组件被复用时调用，比如路径参数的变化
2. 可以访问到组件实例的this

			- beforeRouteLeave

				- 1. 当导航离开渲染该组件的对应路由时调用
2. 可以访问this

			- 使用组合api

				- vue3中可以使用组合api和setup函数，通过引入onBeforeRouteUpdate和onBeforeRouteLeave分别添加update和leave守卫。

	- 完整的导航解析流程：

		- 1. 导航被触发
2. 在失活的组件里调用beforeRouteLeave守卫
3. 调用全局的beforeEach
4. 在重用的组件里调用beforeRouteUpdate
5. 在路由配置里调用beforeEnter
6. 解析异步路由组建
7. 在被激活的组件里调用beforeRouteEnter
8. 调用全局的beforeResolve
9. 导航被确认
10. 调用全局的afterEach
11. 触发DOM更新
12.调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

	- 路由原信息

		- meta

	- 组合式api

		- 在setup中访问路由和当前路由

			- import { useRouter, useRoute } from 'vue-router'
const router = useRouter();
const route = useRoute()

		- 导航守卫

			- import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

	- 路由懒加载

		- component配置接收一个返回Promise组件的函数，vue router只会在第一次进入页面时才会获取这个函数，然后使用缓存数据
		- 把组件按组分块

			- webpack

				- 使用命名chunk：
 () => import(/* webpackChunkName: "group-user" */ './UserDetails.vue')

webpack会将任何一个异步模块与相同的块名称组合到相同的异步块中

			- vite

- VueX

	- 对vuex的理解？vuex的原理

		- vuex是vue的状态管理模块，他采用集中式存储管理应用的所有的组件在状态。

状态自管理应用包括三个部分：状态，驱动应用的数据源；视图，以声明方式将状态映射到视图；操作：响应在视图上的用户输入导致的状态变化
		- vuex可以帮助我们管理共享状态，但是如果不是大型项目的话，不需要用vuex，用store模式就足够了。
		- 改变state中状态的唯一途径就是显示的提交mutation

	- state

		- 获取状态：this.$store.state.xxx
		- 获取多个状态：可以使用mapState辅助函数结合对象展开运算符，帮我们生成计算属性

			- computed: {
...mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}

当计算属性的名称和state的子节点名称相同时，可以给mapState传一个字符串数组。

	- getter

		- 可以认为getter是store的计算属性
		- 1. getter接受state作为第一个参数：
getters:{
   todoList:(state)=>state.todoList.filter(todo=>todo.done),
......
}
2. getter也可以接受其他getter作为第二个参数，这样就可以访问到其他getter
getters: {
   todoList:(state, getters)=>{
      return getters.doneTodos.length
  }
}
		- 如何访问getters：
1. 通过属性访问：getter会暴露为store.getters对象，在组件内可以以属性的形式访问getters内的值
2. 通过方法访问：store.getters.getTodoById(2)
		- mapGetters辅助函数，可以一次将多个getter映射到组件的计算属性上

	- mutations

		- 1. commit mutation是改变store内state的唯一方法。
		- 2. mutation非常类似于事件，每个mutation都有一个字符串的事件类型和一个回调函数。回调函数内可以修改state，而且会接受state作为第一个参数。

触发increase时，需要调用store.commit方法，store.commit('increase')

			- const state = createState({
    state: {
        count: 0
    },
    mutations:{
        increase(state){
              state.count ++;
        }
    }
})

		- 3. 提交载荷：即向store.commit传入额外的参数，大多数情况下载荷是一个对象。
		- 4. 对象风格的提交方式：store.commit({type: 'increase', amount: 10})
		- 5. 使用常量代替Mutation事件类型，并把这些常量放在单独的文件中管理
		- 6. mutation必须是同步函数，异步操作放到action中处理

	- actions

		- 1. action类似于mutation，不同的是action内可以进行异步操作。action通过提交mutation而不是直接更改状态。
		- 2. action函数接收一个与store具有相同方法和属性的上下文对象（context），可以调用context.commit来提交mutation，或者通过context.state和context.getters来获取state和getters
		- 3. 分发action，通过store.dispatch()
		- 4. action内可以进行异步操作，这也是为什么我们 不直接分发mutation的原因
		- 5. 在组件中分发action

			- 1. 使用this.$store.dispatch
			- 2. 使用mapActions函数，将组件的methods映射为store.dispatch调用

				- 如：
{
  methods: {
    ...mapActions({
     // 将组件的add方法，映射为this.$store.dispatch('increase')
      add: 'increase'
    })
  }
}

		- 6. 组合action，为处理异步问题，action内可以处理promise并且可以返回promise

	- modules  namespace

		- 1. 什么是modules？
由于store使用的单一状态数，所有的状态都会集中到一个比较大的对象上。当在一个大型并且比较复杂的项目中时，store对象可能会变得相当臃肿。为了解决这个问题，Vuex允许我们将store分割成模块（module）。每个模块拥有自己的state、mutation、action。
		- 2. namespace，命名空间。默认情况下，模块内部的action和mutation仍然是注册在全局命名空间的，这使得多个模块能够对同一个action和mutation做出响应，getter也同样注册在全局命名空间，

			- 所以需要注意，不要在不同的、无命名空间的模块内部定义两个相同的getter

		- 3. 为什么需要命名空间？当需要模块具有更高的封装度和复用性时，可以添加namespace: true属性来使modules成为带有命名空间的模块，这样当模块被注册后，他的所有getter、mutation、action都会根据模块注册路径重新调整
		- 4. 如何在带有命名空间的模块内访问全局内容?

			- 如果需要在命名空间内使用全局state和全局getter，rootState和rootGetters会作为getter的第三个和第四个参数，也会通过context对象传给action

		- 5. 如何在带命名空间的模块内分发全局action或提交mutation？

			- 将 {root: true} 作为第三个参数传给dispatch或commit：
dispatch('someAction', null, {root: true})
commit('someMutation', null, {root: true})

		- 6. 如何在带命名空间的模块内注册全局action？

			- 添加root：true，并将action函数放在handler中：
 modules: {
    foo: {
      namespaced: true,

      actions: {
        someAction: {
          root: true,
          handler (namespacedContext, payload) { ... } // -> 'someAction'
        }
      }
    }
  }

		- 7. 带命名空间的绑定函数

			- 1. 每个函数或状态都写全路径，这种写法会有些繁琐

				- 1. state:
mapState({a: state=>state.some.nested.module.a})

2. getter: 
mapGetters(['state/some/nested/module/getterA'])

3. action
mapAction(['state/some/nested/module/foo'])

			- 2. 将模块的空间名称字符串作为第一个参数传给mapState、mapGetters、mapAction

				- 如action：mapAction(‘state/some/nested/module', ['foo','bar'])

			- 3. 使用 createNamespacedHelpers 创建基于某个命名空间辅助函数。它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数

				- const {mapState, mapActions} = createNamespacedHelpers('some/nested/module')

export default{
    computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions([
      'foo',
      'bar'
    ])
  }
}

	- 组合式api

		- 访问state和getter：useStore
		- 访问action和mutation：

			- import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()

    return {
      // 使用 mutation
      increment: () => store.commit('increment'),

      // 使用 action
      asyncIncrement: () => store.dispatch('asyncIncrement')
    }
  }
}

- axios

	- 请求拦截、响应拦截

### vue2

- 数据代理
- 双向数据绑定

### vue3

- Proxy和Reflect
- 组合API

	- setup
	- ref和reactive
	- watch
	- computed

### vue和react的异同？

### vue的优点

### 单向数据流和双向数据绑定？

- 数据流，即数据的流向，就是数据传递。单向数据流就是说数据是像单一方向传输的。对于vue来说，组件之间数据的传递就是单向数据流。对于父子组件，父组件总是通过Props向子组件传递数据，所有的props使得父子组件直线形成了一个单向下行的绑定，父级prop的更新会向下流动到子组件中，但是反过来不行，这可以防止子组件意外改变父级组件的状态，从而导致数据的流向难以理解。如果尝试在子组件内修改prop，那么vue会在浏览器控制台发出警告。
- 双向数据绑定：当我们在前端开发中采用MV*模式时，M--model，指的是模型，也就是数据；V--view，指的是视图，也就是页面展现的部分。通常我们需要将从服务器获取到的数据进行渲染，展示到视图上，当数据有变更时，会再次进行渲染，从而使得视图和数据保持一致。
另一方面，页面也会因为用户的交互，产生状态、数据的变化，这个时候我们会将视图对数据的更改同步到数据，进而同步到后台服务器。

### 什么是单页面应用？优缺点？

### 如何实现服务端渲染？服务端渲染的优缺点

### vue可以从哪些方面进行性能优化？

