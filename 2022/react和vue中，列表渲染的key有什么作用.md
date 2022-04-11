### react 和 vue 中的 key 有什么作用？

##### 一. 虚拟 DOM 中 key 的作用：
key 是虚拟 DOM 中对象的标识，当数据发生变化时，vue 会根据 新数据 生成 新的虚拟 DOM，随后 Vue 内部会进行 新虚拟 DOM 和 旧的虚拟 DOM 的差异对比（diff 算法）：

###### 对比规则：
1. 旧的虚拟 DOM 中找到与新的虚拟 DOM 中具有相同 key 值的 VNode

- 若虚拟 DOM 中内容没有发生变化，直接使用 之前的真实DOM，不会改变DOM
- 若虚拟 DOM 中内容发生了变化，则生成新的真实 DOM，随后替换掉页面中之前的真实 DOM

2. 旧的虚拟 DOM 中没有找到与新的虚拟 DOM 具有相同 key 值的 VNode
创建新的真实 DOM，然后渲染到页面上

##### 二. 用 index 作为 key 值可能会引发的问题？
1. 若对数据进行：逆序添加、逆序删除等破坏原有顺序的操作，会产生没有必要的真实 DOM 更新，页面效果没有问题，但是效率低（因为对数据的顺序进行了改变，导致没有发生变化的数据在渲染时也无法使用之前的真实DOM）
2. 如果结构中还包含了输入类的 DOM，如 input，会产生错误的 DOM 更新，导致页面有问题，如：

```html
<template>
  <div>
    <button @click="addPerson">向列表前添加一个人</button>
    <ul>
      <li v-for="(item,index) in persons" :key="index">
        {{item.name}}---{{index}}
        <!-- 每人一个输入框 -->
        <input type="text" />
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        person: [
          {
            name: '张三',
            id: '001'
          },{
            name: '李四',
            id: '002'
          },{
            name: '王五',
            id: '003'
          }
        ]
      }
    },
    methods:{
      addPerson(){
        let p = {
          name: '老刘',
          id: '004
        }
        this.person.upshift(p)
      }
    }
  }
</script>
```

页面渲染出persons列表后在每行的input中输入姓名
效果图:
<div align="center">
<img src=../static/images/vue_key_01.jpg style="width: 300px"/>
</div>

点击按钮，添加老刘后

<div align="center">
<img src=../static/images/vue_key_03.jpg style="width: 300px"/>
</div>

此时页面上老刘数据添加到persons的第一位，姓名和index都正常渲染，但是input出现了错位的情况。
这是因为旧的虚拟DOM中张三和新的虚拟DOM中老刘具有相同的key：0，diff算法在进行差异对比时，发现name不同，然后页面渲染时就会渲染上新的name，但是对于input，由于上一步在input中输入姓名的操作是发生在真实DOM中的，没有影响到虚拟DOM，所以，在进行对比时会认为这一部分没有发生变化，这时页面就会继续使用上一次渲染的input，这也就导致了‘老刘’这条数据在页面上的input是张三的。

对比过程图

<div align="center">
<img src=../static//images//vue_key_04.jpg style="width: 300px"/>
</div>

##### 三.开发中如何选择key？
1. 最好使用每条数据的唯一标识作为key，比如id，手机号，身份证号等唯一值
2. 如果不存在对数据逆序添加、逆序删除等破坏顺序的操作，仅用于渲染列表展示，使用index作为key是不会有问题的
