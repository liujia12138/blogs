### 问题：项目实际使用过程中，由于浏览器缓存问题，可能会导致使用的版本不是服务器上部署的最新版本，需要在项目中写入版本号

### 如何解决问题？
#### 1. 在vue.config.js中，加上写入版本号逻辑

``` js
const fs = require('fs')
const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const TimeStamp = new Date().getTime()

// 写入版本号
if(process.env.NODE_ENV === 'production'){
  process.env.VUE_APP_VERSION = TimeStamp;

  // 写入到.env文件中
  fs.writeFile(resolve('.env'), `VUE_APP_VERSION=${TimeStamp}`, err=>{
    if(err){
      return console.log(err)
    }
    console.log(`版本号变量写入成功：${TimeStamp}`)
  })

  // 写入到public的文件
  fs.writeFile(resolve('public/v.json'), JSON.stringify({version: TimeStamp}), err => {
    if(err){
      return console.log(err)
    }
    console.log(`版本号写入成功：${TimeStamp}`)
  })
}
```

#### 2. 在router/index.js中加入判断版本号逻辑

``` js
router.beforeEach(async(to, from, next)=>{
  // 获取版本号
  let version = await http.get(`${location.origin}/v.json`).then(res => {
    return res.data.version
  })

  if(process.env.NODE_ENV === 'production' && process.env.VUE_APP_VERSION !== version){
    // 提示存在新版本
    MessageBox('系统版本有更新，可按【CTRL + F5】或【清除浏览器缓存】获取最新资源', '提示').then(_ => {
      window.location.reload()
    }).catch(_ => {})
    return;
  }
  // ......
})
```