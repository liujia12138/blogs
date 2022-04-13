#### vue 实现数据监听的原理

##### 一个简单的demo实现数据劫持
```js
let data = {
    name: 'tom',
    age: 18,
    friends: [
      {
        name: 'jerry',
        age: '17'
      }
    ]
  }

  // 创建监听实例对象，用于监视data中数据的变化
  const obs = new Observer(data)

  // 准备一个vm实例
  let vm = {}
  vm._data = data = obs
  console.log(vm)
  
  function Observer(obs){
    // 汇总对象中的所有属性
    const keys = Object.keys(obs)
    keys.forEach((k)=>{
      Object.defineProperty(this, k, {
        get(){
          return obs[k]
        },
        set(val){
          console.log( `修改了${k}`)
          obs[k] = val
        }
      })
    })
  }
```

数据劫持：将原始的数据对象data，使用Object.defineProperty 遍历属性，然后用set和get实现劫持

#### 总结：
##### 1. vue会监视data中所有层次的数据
##### 2. 如何监视对象中的数据？
通过Object.defineProperty中的 setter实现监视，且要在实例化vue对象时就传入要监测的数据
1. 如果给对象后追加属性，vue默认不做响应式处理
2. 如果需要给后添加的属性做响应式需要使用：Vue.set() 或者vm.$set()
##### 3. 如何监视数组中的数据？
  通过包裹数组更新元素的方法实现，本质就是做了两件事：
  1. 调用原生的方法对数组进行更新
  2. 重新解析模板，进而更新页面
##### 4. 如何在vue中修改数组中的某个元素？
  1. 使用push、pop、shift、unshift、splice、sort、reverse
  2. 使用Vue.set() 或者vm.$set()

注意：Vue.set() 和 vm.$set()不能给vm或者vm的跟数据对象添加属性


