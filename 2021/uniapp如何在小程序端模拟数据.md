### 问题描述：使用uniapp开发小程序，发现运行到微信开发者工具时用mockjs模拟数据接口无法使用

### 解决办法
使用better-mock

#### 安装better-mock
[官方文档]<!https://lavyun.github.io/better-mock/document/>
```
cnpm install better-mock --save-D
```

#### 引入better-mock
因为better-mock完全兼容mockjs，只需要将mock目录下index.js中
```
const Mock = require('mockjs')
```
改为
```
const Mock = require('better-mock/dist/mock.mp.js')
```
再次运行就可以在微信开发者工具看到模拟的数据啦