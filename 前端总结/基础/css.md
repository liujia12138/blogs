
- css选择器及权重

	- id选择器100，类选择器10，属性选择器10，伪类选择器（li:first-of-type）10，标签选择器1，伪元素选择器（div:after）1，兄弟选择器（div+p）0，子选择器（div>p）0，后代选择器（div p）0，通配符选择器（*）0
	- 注意：
!important声明的样式优先级最高；
如果权重相同，最后出现的样式生效；

- css中可继承和不可继承的属性有哪些

	- 有继承性的属性：
1. 字体相关的属性；
2.文本相关的：text-align、text-indent、line-height、word-space、color等
3.visibility
4.列表布局属性：list-style
5.光标属性：cursor

- display的属性值及作用

	- display属性值：
none：元素不可见，且会从文档流中移除
block：块级元素。宽度默认为父元素的宽度，可设置宽高，可以设置margin、padding；会自动换行
inline：行内元素，默认宽度为内容宽度，不可设置宽高；可以设置水平方向的padding和margin，但是不能设置垂直方向的；不会自动换行；
inline-block：行内块元素，默认宽度为内容宽度，可设置宽高；
list-item：像块级元素一样显示；
table：作为块级表格显示；
inherit：继承父级的display属性；

- 隐藏元素有几种方法？

	- 1.display：none，将元素从文档流中移除
2.visibility：hidden，元素在页面中仍占据空间，但是不会响应事件
3.opacity：0，元素在页面中仍占据空间，并且能够响应事件
4.position：absolute，然后将元素定位到可视区域外
5.z-index：设置为负值，用其他元素遮盖出想要隐藏的元素
6.transform：scale(0,0)，将元素缩放为0，元素在页面中仍然占据位置，但是不会响应绑定的事件

- link和@import的区别

	- link和@import都是从外部引入css的方式，区别在于：
1.link是XHTML标签，除了加载css外还可以定义RSS等其他事务；@import只能加载css。
2.link引入css时，在页面载入同时加载；@import要在页面完全载入以后才加载。
3.link无兼容问题；@import是在css2.1提出的，低版本的浏览器不支持。
4.link支持使用js修改样式，@import不支持。

- transition和animation的区别

	- transition是过度属性，强调过度，他的实现需要触发一个事件，比如鼠标移上去、焦点等才执行动画。
animation是动画属性，不需要触发事件，设定好时间之后可以自己执行，且可以循环一个动画。

- 伪元素选择器和伪类选择器

	- 伪元素：在内容元素的前后插入额外的元素或样式，但是这些元素实际上并不会在文档中生成。只在外部显示可见，但不会在文档的源代码中找到，因此称为伪元素，比如:before、:after、::first-letter 第一个字母、::first-line 第一行、::selection 被选中的字段
	- 伪类：将特殊的效果添加到特定选择器上。它是已有元素上添加类别的，不会产生新的元素。如:hover、:first-child、:hover、:active、:focus
	- 总结：伪类是通过在元素选择器上加入伪类改变元素状态，而伪元素通过对元素的操作进行对元素的改变

- 对盒模型的理解

	- CSS3中的盒模型有以下两种：标准盒子模型和IE盒子模型
盒模型都是由四个部分组成，分别是margin、border、padding和content。
标准盒模型和IE盒模型的区别在于设置width和height时，所对应的范围不同：
标准盒模型的width和height只包含了content，而IE盒模型的width和height包含了content、padding和border。
盒模型可以通过修改box-sizing属性来改变：
box-sizing：content-box表示是标准盒模型（默认值）；
box-sizing:  border-box表示是IE盒模型；

- css3有哪些新特性？

	- 1.新增css选择器：属性选择器、结构伪类选择器（:nth-child(n),:nth-of-type(n)等）、目标伪类选择器（:target）、否定选择器（:not()）、兄弟选择器（h1+p）
2.圆角属性
3.多列布局：multi-column layout
4.阴影和反射  shadowReflect
5.文字特效 textShadow
6.文字渲染 TextDecoration
7.2D/3D转换 transform
8.flex布局
。。。。。

- 常见的图片格式和使用场景

	- 1.bmp
2.gif
3.jpeg
4.png-8
5.png-24
6.svg
7.webP

- 什么是精灵图？怎么使用？

	- 1. 什么是精灵图？精灵图，是将页面中涉及到的图片都放在一张大图中，然后利用css的background-image、background-repeat和background-position属性的组合进行背景图定位，展示想要的图片。
2. 为什么使用精灵图？因为所有图片都在一张大图里，减少了http请求，提高了页面性能；还有就是减少了图片体积大小，因为把三张图合成为一张图的大小小于三张图片
3. 有什么缺点？对于开发者来说，使用精灵图时需要借助ps等工具准确测量每个图的位置及大小；对于维护图片者来说，每次图片有改动要尽可能的不影响到其他地方，从而保证变改动更多的css

- 什么是物理像素，逻辑像素和像素密度？为什么移动端要用到@2x、@3x这样的图片？
- margin和padding的区别？

	- margin是外边距，padding是内边距

- css优化和提高性能的方式？

	- 加载性能：
1. css压缩，将写好的css进行打包压缩，可以减少文件体积
2.css单一样式，比如设置下边距和左边距时，分别使用margin-bottom和margin-left属性
3. 减少使用@import，使用link，因为@import需要等页面加载完成之后才加载
	- 选择器性能：
1. 关键选择器，选择器最右边的部分为关键选择器，css选择器是从左到右进行匹配的，如果使用后代选择器，浏览器会遍历所有子元素来确定是否是指定的元素
2. 避免使用通配符 *
3.尽量少用标签选择器，使用class
4. 尽量少用后代选择器，降低选择器的权重值；尽量将选择器的深度降到最低，最好不要超过三层
	- 渲染性能：
1. 减少使用高性能的属性，如浮动，定位
2. 尽量减少页面的重排重绘
3.去除空规则 {}
4. 属性值为0时，不加单位
5. 使用精灵图
6. 减少选择器嵌套

- css预处理器、后处理器是什么？为什么要使用他们？

	- 预处理器：如sass、less、stylus，增加了css代码的复用性，并且支持层级、变量、函数等写法，结构清晰便于扩展和维护
	- 后处理器：如postCss，通常是在完成的样式表中根据css规范处理css，如给css属性添加浏览器私有前缀实现浏览器的兼容问题

- 媒体查询？常用的尺寸

	- @media 针对不同的屏幕尺寸设置不同的样式，特别是需要设置设计响应式的页面

- 对css工程化的理解？

	- css工程化是为了解决一下问题：1. 宏观设计：css代码如何组织、如何拆分、模块结构怎样设计？2. 编码优化：如何写出更好的css。3. 构建：如何让css的打包结果最优。4. 可维护性
	- 如何实践css工程化？主要从三个方面，1. 预处理器sass、less等。2. 工程化插件，如postCss等。3.webpack loader

- 如何判断元素是否在可视区域？

	- dom.offsetTop < window.innerHeight + document.body.scrollTop
dom.offsetTop: 元素顶部距离文档顶部的高度；
window.innerHeight:浏览器可视区域的高度；
document.body.scrollTop || document.documentElement.scrollTop:滚动过的距离

- :before 和:after的单冒号和双冒号有什么区别？

	- 单冒号用于伪类，双冒号用于伪元素，:before 和 :after是在css2.1中出现的，在css3规范化中被修改为使用双冒号

- 单行、多行文本溢出隐藏？

	- 单行文本溢出隐藏：
overflow:hidden;
white-space:nowrap;
text-overflow:ellipsis;
	- 多行文本溢出隐藏：
overflow:hidden;
text-overflow:ellipsis;
display:-webkit-box;
-webkit-box-orient:vertical;
-webkit-line-clamp:3;

### 页面布局

- 常见的css布局
- px、em、rem、vh、vw、%

	- px：像素，1px表示终端屏幕所能显示的最小区域，像素分为物理像素和css像素。css像素是css中使用的一个抽象单位、物理像素与设备的硬件有关，任何设备的物理像素都是固定的。
em：文本相对长度单位，1em就是父元素字体大小，如果没有设置字体就是浏览器默认字体16px；
rem：css3新增的文本相对长度单位，和em的区别是，rem是相对于文档根元素的即html；
vw/vh：和视窗有关的相对单位，100vw是视窗的宽度，100vh是视窗的高度；注意vmin和vmax分别取vh和vw中的较小值和较大值；
%：相对于父元素或者祖先元素，但是也有是相对于自身的情况，比如transform:translateX(50%)

- flex布局的理解及使用场景

	- flex，弹性布局，用来为盒模型提供最大的灵活性，设为flex布局后，子元素的float、clear、vertical-align属性将失效。采用flex布局的元素称为flex容器，默认存在两根轴：水平的主轴和垂直的交叉轴，默认按照水平主轴排列

容器属性：
1. flex-direction：主轴方向，即项目的排列方向。
2.flex-wrap：排不下时是否换行。
3.flex-flow：是1和2的简写形式，默认值是row nowrap。
4.justify-content：项目在主轴上的对齐方式，值有space-around、space-between等。
5.align-items：项目在交叉轴上如何对齐。
6.align-content：多根轴线的对齐方式。

项目属性：
1.order：项目的排列顺序，数值越小越靠前，默认为0。
2.flex-grow：项目的放大比例，默认为0，即有剩余空间也不放大。
3.flex-shrink：项目的缩放比例，默认为1，即如果空间不足，该项目将缩小。
4.flex-basis：在分配多余空间之前，项目占据的主轴空间，浏览器会根据这个属性，计算主轴是否有多与空间，默认值为auto。
5.flex：flex-grow、flex-shrink和flex-basis的简写，默认值是0 1 auto。
6.align-items：项目的对齐方式，可以与其他项目不同，可覆盖容器的align-items属性，默认为auto。

- 如何实现水平垂直居中对齐

	- 1. 用绝对定位：
a. 宽高不确定的情况下，将元素设置为绝对定位并通过left50%和top50%将元素定位到页面中心，然后用translate(-50%, -50%)将元素移到页面正中心。
b. 在宽高确定的情况下，给元素设置left，right，top，bottom均为0，margin:auto；
c. 宽高确定，通过left50% top50%，然后用margin 负宽高的50%来实现

2. flex布局
给父级容器设置justify-content:center和align-items:center

- 常用的布局，圣杯布局，双飞翼

	- 圣杯布局：利用浮动和负边距，父元素设置左右的padding，三栏均设为左浮动，中间一栏放在最前面，宽度设为父级元素的宽度，左右两栏都被寄到了下一行，然后通过设置margin为负值将其移动到上一行，然后再利用相对定位定位到两边

		-  .outer{
      height: 200px;
      padding-left:200px;
      padding-right: 200px;
    }
    .center, .left, .right{
      float: left;
    }
    .center{
      width: 100%;
      background: #e1e1e1;
    }
    .left{
      width: 200px;
      margin-left: -100%;
      position: relative;
      left: -200px;
      background-color: aquamarine;
    }
    .right{
      width: 200px;
      margin-left: -200px;
      position: relative;
      right: -200px;
      background-color: blanchedalmond;
    }

	- 双飞翼布局：和圣杯布局的区别是，双飞翼布局在center中加了一个div用来放置内容，然后通过给这个content区设置margin-left和margin-right来给左右两栏腾出位置

		-   .outer {
        height: 200px;
      }
      .center,
      .left,
      .right {
        float: left;
      }
      .center {
        width: 100%;
        background: #e1e1e1;
      }
      .content {
        margin-left: 200px;
        margin-right: 200px;
      }
      .left {
        width: 200px;
        margin-left: -100%;
        background-color: aquamarine;
      }
      .right {
        width: 200px;
        margin-left: -200px;
        background-color: blanchedalmond;
      }

- 两栏布局的实现

	- 两栏布局一般是指左边一栏宽度固定，右边宽度自适应
1.利用float：左栏设置宽度左浮动，右栏margin-left值为左栏宽度
2.flex布局：父级容器display：flex，左栏设置宽度，右栏设置flex：1
3.利用定位，父级设为相对定位，左栏绝对定位并且设置宽度，右栏margin-left设为左栏宽度

- 三栏布局的实现

	- 三栏布局一般指左右两栏宽度固定，中间宽度自适应
1.flex布局：左右两栏固定宽度，中间设置flex:1
2.定位：左右都设为绝对定位且固定宽度，中间设置margin-left和margin-right
3.圣杯布局
4.双飞翼布局

- 如何根据设计稿进行移动端适配？
- 响应式的基本原理和实现

	- 响应式，是指一个网站能够兼容多个终端，而不是为每一个终端做一个特定的版本
实现原理：通过媒体查询@media 查询监测不同的设备屏幕尺寸做处理，且页面头部必须有meta声明的viewport
<meta name="’viewport’" content="”width=device-width," initial-scale="1." maximum-scale="1,user-scalable=no”"/>

### 定位与浮动

#### 为什么需要清浮动，以及如何清浮动？

- 为什么需要清浮动？因为在非IE浏览器下，当父级容器不设置高度，并且子元素浮动，会导致父级高度不能被撑开，子元素溢出，影响布局。

浮动的原理：浮动的元素脱离文档流，不占据空间，引起高度塌陷的现象

清浮动的方式：
1. 给父级定义height属性。
2. 在最后一个浮动元素之后添加一个空的div标签，并添加clear：both属性。
3. 使用::after伪元素
.clearfix::after{
    content: " ";
    display: box; 
    height: 0;
    clear: both;
    visibility:hidden;
  }

- 使用clear清除浮动的原理？
- 对BFC的理解，如何创建BFC？

	- 块级格式化上下文，脱离文档流，内部是一块独立的渲染区域，不会影响到外面的元素的布局

- margin重叠问题？

	- 两个块级元素的上外边距和下外边距可能会合并为一个外边距，取值会取两个中大的值，这种行为叫做外边距折叠。
注意：浮动的元素和绝对定位这种脱离标准文档流的外边距不会折叠。margin重叠只会出现在垂直方向上。

计算原则：
a.如果两个数都是正数，取数值较大的。
b.如果是一正一负，取正数减去负值的绝对值的值。
c.两个都是负值，用0减去两个中绝对值大的值

解决方法：
1. 兄弟之间重叠：
a.底部元素设为行内块元素，display：inline-block
b.底部元素设置浮动
2.父子之间重叠：
a.父元素设置overflow：hidden
b.子元素设置display：inline-block
c.子元素浮动或绝对定位

- 元素的层叠顺序？
- position的属性有哪些？区别是什么？

	- relative：相对定位，相对于元素自身之前的位置来定位。不会脱离文档流。
absolute：绝对定位，相对于除static定位之外的最近的父元素进行定位，找不到满足要求的父级元素的话就会相对于浏览器窗口进行定位。会脱离文档流。
fixed：固定定位，相对于视窗的位置来定位。脱离文档流。
static：默认值，没有定位，元素在正常的文档流中。设置top、left、right、bottom、z-index属性无效。
inherit：继承父元素的position属性值。
sticky：粘性定位，可以认为是相对定位和固定定位的混合，在元素跨越特定阈值前为相对定位，跨过阈值之后为固定定位，但是和固定定位不同的是，他没有脱离标准文档流，不会影响其他元素的位置

- 对sticky定位的理解？

### 应用场景

- 实现一个三角形
- 实现一个扇形
- 实现一个宽高自适应的正方形

	- 1. 使用vw实现：width：10%；height：10vw；
2.利用元素的padding/margin百分比相对于父元素的width性质来实现：width：20%；padding-top:20%；height：0；
。。。

- 画一条高度是0.5px的线

	- 1. transform:scale(1, 0.5)，y轴缩小到0.5倍

- 设置小于12px的字体

	- 1. webkit内核可以通过设置-webkit-text-size-adjust:none，字体大小不在受限制，但是高版本的chrome不支持了
2.使用css3的transform:scale()，进行缩放
3.使用图片

- 如何解决1px问题

