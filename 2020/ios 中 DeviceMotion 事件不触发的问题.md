# ios 中 DeviceMotion 事件不触发的问题

### DeviceMotion是什么？
window对象有一个事件DeviceMotionEvent，这个事件可以用来监听设备的加速度变化等信息，在该事件的event对象中，包含了acceleration对象，我们可以在acceleration对象中获取到设备在各方向上的加速度

### 问题：window.DeviceMotionEvent 有定义，但是无法触发

### 用法

```js
if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', function (e) {
    var acceleration = e.accelerationIncludingGravity
    // x,z,y分别对应手机三个方向的加速度
    // 需要注意的是，ios这三个值和安卓正好相反，比如我们向左移动手机，安卓会得到一个速度为10的x轴加速度，而ios会得到-10
    var x = acceleration.x
    var y = acceleration.y
    var z = acceleration.z
    // 。。。。
  })
}
```

### 踩坑：

#### 1.ios 下的 https 要求

ios10 之后做了安全限制，要使用 devicemotion 必须使用 https 协议

#### 2.ios12.2 之后的安全限制

ios12.2 之后，用户可以在手机的设置中关闭掉“动作与方向访问”，我们无法直接获取到用户是否关闭了这个权限的

#### 3.ios13 的用户权限请求

ios13 以后需要用户申请权限，注意ios13.3以后要用户主动触发之后调用 DeviceMotionEvent.requestPermission()，不能打开页面是自动调用，否则会报错
[文档]<!https://w3c.github.io/deviceorientation/#devicemotionevent>

### 最终实现
```js
// 判断是否是 ios 设备

function getIos() {
  var u = window.navigator.userAgent

  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

/*

setDeviceMotion 添加陀螺仪监控

cb devicemotion的事件处理函数

errCb 不支持 devicemotion 时的处理回调

*/

function setDeviceMotion(cb, errCb) {
  if (!window.DeviceMotionEvent) {
    errCb('设备不支持DeviceMotion')

    return
  }

  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    // IOS 13

    DeviceMotionEvent.requestPermission()

      .then((permissionState) => {
        if (permissionState === 'granted') {
          window.addEventListener('devicemotion', cb)
        }
      })

      .catch((err) => {
        errCb('用户未允许权限')
      })
  } else {
    // 其他支持加速度检测的系统

    let timer = setTimeout(function () {
      errCb('用户未开启权限')
    }, 1000)

    window.addEventListener(
      'devicemotion',
      (e) => {
        clearTimeout(timer)
      },
      { once: true }
    )
    window.addEventListener('devicemotion', cb)
  }
}



document.ontouchstart = function () {
  setDeviceMotion(
    (e) => {
      let motion = e.acceleration
      let { x, y, z } = motion
      if (!getIos()) {
        x = -x

        y = -y

        z = -z
      }
    },
    (errMessage) => {
      alert(errMessage)
    }
  ) // 最后这里一定要注意，在IOS 13.3中必须通过用户操作去获取该权限
}
```
