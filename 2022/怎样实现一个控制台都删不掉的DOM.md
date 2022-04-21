### 怎样实现一个控制台都删不掉的 DOM（做水印）

#### MutationObserver

MutationObserver 提供了监视对 DOM 树所做更改的能力。他被设计为旧的 Mutation Events 功能的替代品，是 DOM3 Event 规范的一部分。
MutationObserver 构造函数会创建并返回一个新的 MutationObserver，在指定的 DOM 发生变化时被调用

##### 方法

1. disconnect()
   阻止 MutationObserver 实例继续接收的通知，直到再次调用其 observe()方法，该观察者对象包含的回调函数都不会再被调用

2. observe()
   配置 MutationObserver 在 DOM 更改匹配给定选项时，通过其回调函数开始接收通知。

3. takeRecords()
   从 MutationObserver 的通知队列中删除所有待处理的通知，并将它们返回到 MutationRecord 对象的新 Array 中。

```js
const styleStr = `
      position: fixed;
      bottom: 150px;
      left: 200px;
      z-index: 9999;
      transform: rotateZ(-45deg);
      opacity: 0.6;
    `
const nodeId = sjs(10)

createDiv()
parentObserver()

function createDiv() {
  const ele = document.createElement('canvas')
  const ctx = ele.getContext('2d')
  ctx.fillText('MutationObserver', 15, 50)
  // ele.id = nodeId
  // ele.innerText = 'MutationObserver'
  ele.setAttribute('id', nodeId)
  ele.setAttribute('style', styleStr)
  document.body.appendChild(ele)
  wmObserver(ele)
}

// wmObserver 监听水印
function wmObserver(ele) {
  new MutationObserver(function (mutationsList, observe) {
    const target = mutationsList[0].target
    target.setAttribute('style', styleStr)
    observe.takeRecords()
  }).observe(ele, { attributes: true, childList: true, characterData: true })
}

// parentObserver 监听父级
function parentObserver() {
  new MutationObserver(function () {
    var e = document.querySelector('#' + nodeId)
    console.log(e)
    // 没有找到水印的dom就生成一个新的
    e ? e.getAttribute('style') !== styleStr && e.setAttribute('style', styleStr) : createDiv()
  }).observe(document.querySelector('#' + nodeId).parentNode, { childList: true })
}

//随机生成指定长度的字符串
function sjs(leng) {
  // 大写字母、小写字母、数字能出现的情况
  var char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  // 定义一个字符串接收随机生成的字符串
  var chars = ''
  // 遍历长度
  for (var i = 0; i < leng; i++) {
    // chars 的值为char中下标为随机数的值
    // 这个随机数取值是Math.random()  0-1不到1
    // Math.random()*char.length 0-1之间的数*char的长度，生成一个0-char.length之间的数,取整不包含最后一个，但是length长度为最大下标+1，所以不用加一
    //最后用+来拼接
    chars += char.charAt(parseInt(Math.random() * char.length))
  }
  return chars
}
```
