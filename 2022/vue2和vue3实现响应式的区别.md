### vue2 和 vue3 实现响应式的区别

#### 一、vue2 是如何实现响应式的

基本原理：将原始的数据对象 data，使用 Object.defineProperty 遍历属性，然后用 set 和 get 实现数据的读取和更新

vue2 的响应式原理有什么问题？

1. 新增、删除属性，页面不会更新。需要使用$set 和 $delete方法。
因为新增和删除操作不会触发defineProperty内的set方法，$set 和$delete是vue封装过的
$set $delete 实现原理？

2. 通过下标修改数组，界面不会自动更新。需要使用 vue 封装的 7 个数组方法或者使用$set。

[vue 响应式原理具体看这里](./vue实现数据监听的原理.md)

#### 二、vue3 的响应式是如何实现的

实现原理：
通过 Proxy：拦截对象中任意属性的变化，包括属性值的读写、添加、删除等操作
通过 Reflect：对被代理对象的属性进行操作

```js
// 源数据
let person = {
  name: '张三',
  age: 18
}

const p = new Proxy(person, {
  // 有人读取p的属性时调用
  get(target, key) {
    console.log('有人读取了p身上的' + key + '属性')
    return target[key] || '没有这个值'
  },
  // 有人修改p的某个属性、或给p追加属性的时候调用
  set(target, key, value) {
    console.log(`有人将p的${key}属性改为了${value}`)
    target[key] = value
  },
  // 有人删除p的某个属性时调用
  deleteProperty(target, key) {
    console.log(`有人删除了p身上的${key}属性`)
    return delete target[key]
  }
})
```
