###  **问题描述**：echarts引入外部字体文件时，页面渲染异常，出现部分文字没有渲染成指定字体的情况

如图:

![效果图](../static/images/echarts1_1.png)


### 原因：字体文件未加载完成就完成了echarts图表部分的代码

### 解决办法：等字体下载完再画图或者压缩字体文件

``` js
document.fonts.ready.then(()=>{
  //执行echarts图
})
```