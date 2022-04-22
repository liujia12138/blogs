### 怎样实现一个控制台都删不掉的 DOM（保护水印）

#### MutationObserver

MutationObserver 提供了监视对 DOM 树所做更改的能力。他被设计为旧的 Mutation Events 功能的替代品，是 DOM3 Event 规范的一部分。
MutationObserver 构造函数会创建并返回一个新的 MutationObserver，在指定的 DOM 发生变化时被调用

##### 方法

1. disconnect()
   阻止 MutationObserver 实例继续接收的通知，直到再次调用其 observe()方法，该观察者对象包含的回调函数都不会再被调用

2. observe(options)
   配置 MutationObserver 在 DOM 更改匹配给定选项时，通过其回调函数开始接收通知。
   注意：当调用observe方法时，childList、attributes或者characterData三个属性中，至少有一个必须为true，否则会抛出异常。
   options：
    1. attributeFilter：要监视的特定属性名称的列表。如果未包含此属性，则对所有属性的更改都会触发变动通知。无默认值。
    2. attributeOldValue：当监视节点的属性改动时，将此属性设置为true，将会记录任何有改动的属性的上一个值。有关观察属性更改和值记录的详细信息。无默认值。
    3. attributes：设置为true时，可以观察受监视元素的属性值的变更。默认为false。
    4. characterData：设置为true时，可以监视指定目标节点或子节点树中节点所包含的字符数据的变化。无默认值
    5. characterDataOldValue：设置为true时，可以在受监视节点上文本数据发生变化时记录节点文本的上一个值。无默认值。
    6. childList：设为true，可以监视目标节点添加或删除子节点的操作。默认值为false。
    7. subtree：设为true，可以将监视范围扩展至目标节点整个节点数树中的所有节点（即子孙节点），MutationObserverInit的其他值也会作用于此子树下的所有节点，而不仅仅只作用于目标节点。默认值为false。

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
  ele.setAttribute('id', nodeId)
  ele.setAttribute('style', styleStr)
  document.body.appendChild(ele)
  wmObserver(ele)
}

// wmObserver 监听水印，防止修改水印样式
// 参考：https://juejin.cn/post/7020602166591111205
// 因为水印的样式可以通过控制台修改，如果被设置了 display:none 等样式，也会失去保护作用
// 对于这种情况，我们可以监听水印DOM的style属性，当属性发生变动时，再通过 setAttribute 将正确的样式设置到DOM上
function wmObserver(ele) {
  new MutationObserver(function (mutationsList, observe) {
    const target = mutationsList[0].target
    target.setAttribute('style', styleStr)
    observe.takeRecords()
  }).observe(ele, { attributes: true, childList: true, characterData: true })
}

// parentObserver 监听父级，防止删除水印dom
// 因为被监听的目标节点本身被删除的话是不会触发MutationObserver回调的，所以需要监听水印DOM节点的父元素或者body元素
// 当body作为监听的目标节点时，只有删除掉body时MutationObserver才会失效，此时页面内需要保护的内容也就已经被删掉了，有无水印的意义不大。
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
