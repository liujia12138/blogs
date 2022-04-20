### 怎样实现一个控制台都删不掉的 DOM

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
      bottom: 20px;
      left: 200px;
      z-index: 9999;
    `
function createDiv(){
  const ele = document.createElement('div')
  ele.innerText = 'MutationObserver'
  ele.setAttribute('id', 'test')
  document.body.appendChild(ele)
  observe(ele)
}
createDiv();
function observe (ele){new MutationObserver(function (mutationsList, observe) {
  console.log(mutationsList, observe)
  const target = mutationsList[0].target
  target.setAttribute(
    'style',
    styleStr
  )
  observe.takeRecords()
}).observe(ele, { attributes: true, childList: true, characterData: true })}

 new MutationObserver(function () {
    var e = document.querySelector('#test')
    e ? e.getAttribute('style') !== styleStr && e.setAttribute('style', styleStr) : createDiv()
}).observe(document.querySelector('#test').parentNode, { childList: !0 })

function obs(t) {
  var e = this,
    n = { attributes: !0, childList: !0, characterData: !0 },
    i = new MutationObserver(function (t) {
      if (!e.isOberserve) {
        var n = t[0].target
        n.setAttribute('style', e.styleStr), n.setAttribute('id', e.CONTAINERID), i.takeRecords()
      }
    })
  i.observe(t, n)
}
```

```js
function t() {
  var e = this,
    n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
  i(this, t),
    (window.onload = function () {
      ;(e.CONTAINERID = (0, o.randomId)()),
        (e.drawCanvas = e.drawCanvas.bind(e)),
        (e.parentObserver = e.parentObserver.bind(e)),
        (e.Repaint = e.Repaint.bind(e)),
        (e.isOberserve = !1),
        e.init(n),
        e.drawCanvas(),
        e.parentObserver()
    })
}
return (
  r(t, [
    {
      key: 'init',
      value: function (t) {
        ;(this.option = {}),
          (this.option.text = t.text || '©2019-parent pig4cloud.com'),
          (this.option.font = t.font || '14px 黑体'),
          (this.option.canvasWidth = t.canvasWidth || 500),
          (this.option.canvasHeight = t.canvasHeight || 200),
          (this.option.textAlign = t.textAlign || 'center'),
          (this.option.textStyle = t.textStyle || 'rgba(100,100,100,0.15)'),
          (this.option.degree = t.degree || -20)
      }
    },
    {
      key: 'drawCanvas',
      value: function () {
        this.isOberserve = !0
        var t = document.createElement('div')
        ;(t.id = this.CONTAINERID),
          (this.styleStr =
            '\n            position:fixed;\n            bottom:0;\n            left:0;\n            width:100%;\n            height:40px;\n            text-align:center;\n            z-index:9999;\n            pointer-events:none;'),
          t.setAttribute('style', this.styleStr),
          (t.innerHTML = ''),
          document.body.appendChild(t),
          this.wmObserver(t),
          (this.isOberserve = !1)
      }
    },
    {
      key: 'wmObserver',
      value: function (t) {
        var e = this,
          n = { attributes: !0, childList: !0, characterData: !0 },
          i = new MutationObserver(function (t) {
            if (!e.isOberserve) {
              var n = t[0].target
              n.setAttribute('style', e.styleStr), n.setAttribute('id', e.CONTAINERID), i.takeRecords()
            }
          })
        i.observe(t, n)
      }
    },
    {
      key: 'parentObserver',
      value: function () {
        var t = this
        new MutationObserver(function () {
          if (!t.isOberserve) {
            var e = document.querySelector('#' + t.CONTAINERID)
            e ? e.getAttribute('style') !== t.styleStr && e.setAttribute('style', t.styleStr) : t.drawCanvas()
          }
        }).observe(document.querySelector('#' + this.CONTAINERID).parentNode, { childList: !0 })
      }
    },
    {
      key: 'Repaint',
      value: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
        ;(this.isOberserve = !0), this.init(t)
        var e = document.querySelector('#' + this.CONTAINERID)
        e.parentNode.removeChild(e), this.drawCanvas()
      }
    }
  ]),
  t
)
```
