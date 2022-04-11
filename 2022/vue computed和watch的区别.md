#### vue computed 和 watch 的区别？

1. computed 能完成的功能，watch 都可以完成
2. watch 能完成的功能，computed 不一定能完成。如 watch 可以进行异步操作

注意：

1. 所有被 vue 管理的函数，最好写成普通函数，这样函数内的 this 才会指向 vue 实例对象
2. 所有不被 vue 管理的函数，比如定时器的回调、ajax 的回调等，最好写成箭头函数，因为这样 this 会指向定义函数时所在的 this，即 vue 组件实例对象，否则会指向 window

```js
// 页面两个输入框，分别是姓和名字，输入框下面自动生成全名fullName
const vm = new Vue({
  data() {
    return {
      firstName: '张',
      lastName: '三',
      fullName: ''
    }
  },
  // watch写法
  watch: {
    firstName(value) {
      this.fullName = value + this.lastName
    },
    // 异步操作：修改firstName一秒之后才更新fullName
    // firstName(value){
    //   setTimeout(()=>{
    //     this.fullName = value + this.lastName
    //   })
    // },
    lastName(value) {
      this.fullName = this.firstName + value
    }
  },

  // computed写法
  computed: {
    fullName() {
      return this.firstName + this.lastName
    },
    // 异步操作,无法实现watch里面的延迟操作
    // fullName() {
    //   setTimeout(() => {
    //     return this.firstName + this.lastName
    //   })
    // }
  }
})
```
