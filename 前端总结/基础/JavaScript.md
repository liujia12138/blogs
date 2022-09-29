# JavaScript

## JavaScript

### js 基础

- DOM 和 BOM

  - 事件捕获、冒泡、代理、委托

    - 什么是事件委托？使用事件委托有什么好处？
    - 什么是事件冒泡，事件捕获？

  - 定时器

- 数据类型

  - js 有几种数据类型

    - js 有八种数据类型，其中包括 5 个基本数据类型：Undefined、Null、Boolean、Number、String；3 个引用数据类型：Object、Array、Function 数据引用数据类型。

es6 中新增了一个基本数据类型：Symbol

    - 基本数据类型和引用数据类型的区别

    	- 这两个数据类型的区别在于数据的存储位置，原始数据类型直接存在栈中，占据空间小，大小固定，属于被频繁使用的数据；引用数据类型存放在堆中，占据空间大，大小不固定，在栈中存储了指向该数据在堆中的位置，当解释器寻找引用值时，回显检索其在栈中的地址，取得地址后从堆中获得实体。

    - 判断数据类型的几种方法

    	- 1. typeof：基本数据类型和function能够正常判断，但是数组、对象、null都会被判断为object

console.log(typeof 2);// number
console.log(typeof true);// boolean
console.log(typeof []);// object
console.log(typeof {});// object - 2. instanceof：只能正确判断引用数据类型，不能判断基本数据类型，

原理是判断其在原型链中能否找到该类型的原型

console.log(2 instanceof Number);//false
console.log('str' instanceof String);//false
console.log(true instanceof Boolean);//false
console.log([] instanceof Array);//true
console.log({} instanceof Object);//true
console.log(function(){} instanceof Function);//true - 3. constructor
constructor 有两个作用，一是判断数据的类型，二是对象实例通过 constructor 对象访问他的构造函数，但是如果手动更改了原型那 constructor 就不能用来判断数据类型了
console.log((2).constructor === Number);//true
console.log(('str').constructor === String);//true - 4. Object.prototype.toString.call()
使用 Object 对象的原型方法 toString 来判断数据类型
console.log(Object.prototype.toString.call('str'));//[object String]
console.log(Object.prototype.toString.call(true));//[object Boolean]
console.log(Object.prototype.toString.call(undefined));//[object Undefined]

    		- Object.toString()和Object.prototype.toString()有什么区别？

toString 是 Object 的原型方法，而 Array、Function 等类型作为 Object 实例，都重写了 toString 方法。不同的对象类型调用 toString 方法时，调用的是重写之后的 toString 方法，比如 Array.toString 方法会将数组转成字符串

    - 判断数组的方法有哪些？

    	- 1. Object.prototype.toString.call()

2.  通过原型链判断：arr.**proto** === Array.prototype
3.  es6 的 Array.isArray()方法
4.  通过 instanceof 判断：arr instanceof Array
5.  通过 Array.prototype.isPrototypeOf(arr)

        - null和undefined的区别？他俩谁占内存？

        	- Undefined和Null都是基本数据类型，且都只有一个值，undefined和null。

    undefined 表示未定义，null 表示空对象，一般变量声明但是没有定义的时候会返回 undefined，null 主要用于赋值给一些可能会返回对象的变量作为初始值。
    undefined 在 js 中不是保留字，这意味着 undefined 可以作为一个变量名来使用。

        - typeof null的结果是什么？为什么？

        	- typeof null 的结果是Object，这是一个历史遗留问题，在JavaScript第一个版本中，所有值都存储在32位的单元中，每个单元包含一个小的类型标签以及当前要存储值的真实数据。类型标签存储在每个单元的低位中，共有五个数据类型：object、int、double、string、boolean

    有两种特殊类型，undefined 和 null，null 的指针全是 0，也就是说 null 的类型标签也是 000，和 Object 的类型标签一样，所以会被判定为 Object

        - instanceof 操作符的原理？

        	- 原理是判断其在原型链中能否找到该类型的原型

        - isNaN和Number.isNaN的区别是什么？

        	- 函数isNaN在接收到参数后，会尝试将这个参数转换为数值，任何不能被转换为数值的值都会返回true，因为传入非数字值也会返回true，会影响NaN的判断。

    Number.isNaN 会先判断传入参数是否为数字，如果是数字再继续判断是否为 NaN，不会进行数据类型的转换，判断 NaN 更为准确。
    console.log(isNaN('str'));// true
    console.log(Number.isNaN('str'));// false

        - 为什么0.1+0.2 !==0.3？

        	- console.log(0.1+0.2);// 0.30000000000000004

    这是因为计算机是通过二进制的方式存储数据的，所以计算机计算 0.1+02 时，实际上是计算两个数的二进制的和。0.1 的二进制是 0.000110011001100...（1100 循环），0.2 的二进制是 0.00110011001100...（1100 循环），两个数都是二进制的无限循环小数，0.1 和 0.2 的二进制相加再转换为十进制就是 0.30000000000000004

        - js隐式类型转换

- 深拷贝浅拷贝
- 作用域和闭包

  - 什么是闭包？闭包过多会导致什么问题以及如何解决
  - 块级作用域

- this

  - call、apply、bind 有什么作用？有什么区别？
  - new 一个新对象的过程都发生了什么？

- new 操作符的实现原理
- map 和 object 的区别
- map 和 weekMap
- javascript 有哪些内置对象？
- js 脚本延迟加载的方法有哪些？
- 数组有哪些原生方法？
- Unicode、utf-8、utf-16、utf-32 的区别？
- 什么是类数组？怎么将类数组转换为数组？

  - 类数组：具有 length 属性、可以按索引方式存储数据、可以遍历、但是不具备数组的 pop、push 等方法

常见的类数组：arguments、dom 的 nodeList 都属于类数组

怎么将类数组转换为数组？ 1.使用 Array.from()方法
2.Array.prototype.slice.call(likeArr)或者[].slice.call(likeArr)

- 为什么函数的 arguments 是类数组而不是数组？怎样遍历类数组？
- DOM 和 BOM
- JavaScript 为什么要进行声明提升？

### js 高级

- ES6/ES7

  - var 和 let、const 的区别

    - 1. 块级作用域：let 和 const 有块级作用域

2. 重复声明：let 和 const 不能重复声明，在一个块级作用域内，let 和 const 不允许重复声明同一个变量
3. 声明提升：var 命令会发生声明提升，即变量可以在声明之前使用，值为 undefined，let 和 const 不存在声明提升，使用 let、const 声明的变量一定要在声明之后使用，否则会报错
4. 初始值：var 和 let 声明的变量可以不设置初始值，const 声明的变量必须设置初始值
5. 重新赋值：let 和 var 声明的变量可以更改指针，及可以重新赋值，const 声明的变量不可以改变指针的指向 - 用 const 声明的对象的属性可以修改吗？

可以的，const 保证的是变量的值不变，也就是变量指向的内存地址不变，对于基本数据类型来说，他的值就保存在变量指向的内存地址，因此等同于常量。但是对于引用数据类型来说，变量保存的只是一个指针，只要保证指针是固定不变的即可，指针指向的数据结构是可变的。 - 暂时性死区：let 和 const 声明的变量，在变量声明之前使用会报错，所以在代码块内，变量声明之前改变量都是不可使用的，被称为暂时性死区。

    - 变量的解构赋值

    	- 数组
    	- 对象

    		- 注意，与数组的解构赋值不同，数组的元素是按顺序排列的，变量的取值由他的位置决定。但是对象的属性没有顺序，变量必须和对象的属性名相同，才能取到正确的值。
    		- 对象的解构赋值的内部机制，是先找到同名属性，然后赋值给对应的变量，比如

let { foo: baz } = { foo: 'abc', baz: 'def' }
baz // 'abc'
foo // error: foo is not defined

    	- 字符串

    		- 字符串也可以进行解构赋值，此时，字符串被转换成了一个类似数组的对象

const [a, b, c, d] = 'hello';
a // 'h'
b // 'e'
c // 'l'

    	- 数值和布尔值

    		- 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

let {toString: s} = 123;
s === Number.prototype.toString // true
let {toString: s} = true;
s === Boolean.prototype.toString // true

    	- 进行解构赋值时，如果等号右边的值不是数组或对象，会将其先转换为对象。由于null和undefined无法转为对象，所以对他们进行解构赋值就会报错
    	- 解构赋值的用途：1.交换变量值；2.从函数返回多个值；3.函数参数的定义；4.函数参数的默认值；

    - 扩展运算符的作用及使用场景

    	- 1. 对象扩展运算符，用于取出对象中所有可遍历的属性，拷贝到当前对象中
    	- 2. 数组扩展运算符

    		- 1.复制数组
    		- 2.合并数组
    		- 3.向数组中添加元素
    		- 子主题 4

    	- 注意，扩展运算符实现的拷贝是浅拷贝，当数组或对象内的元素或属性值是引用数据类型时，修改原数组/对象，会导致当前数据/对象发生变化

    - 字符串的扩展方法

    	- 1. includes() 是否包含某个字符串

2.  startWith() 是否以某个字符串开头
3.  endsWith() 是否以某个字符串结尾
    返回值都是 true / false - repeat() 将原字符串重复 n 次，并返回一个新字符串
    参数如果是小数，会被取整；参数如果是负数或者-Infinity，会报错；参数如果是 0 到-1 之间的小数，则等同于 0，因为会先对小数进行取整运算，repeat(0)会返回空字符串 - codePointAt()  
     - trimStart()、trimEnd() 分别用来消除字符串头部和尾部的空格，返回值是新字符串，不会修改原始字符串

        - 数值的扩展方法

        	- Number.isFinite() 用来检查一个数值是否是有限的，即不是Infinity；

    Number.isNaN()用来检查一个数值是否是 NaN - Number.parseInt(), Number.parseFloat()，ES6 将全局的 parseInt 和 parseFloat 方法移植到了 Number 对象上，用法保持不变

        - 函数的扩展

        	- 函数参数默认值
        	- rest参数，用于获取函数多余的参数，代替arguments对象。

        		- // arguments变量的写法

    function sortNumbers() {
    return Array.prototype.slice.call(arguments).sort();
    }
    // rest 参数的写法
    const sortNumbers = (...numbers) => numbers.sort();

sortNumbers(1,3,6,4,2,5)

    	- 严格模式

    		- es5开始，函数内部可以设定为严格模式。但是在es6中，规定了只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能设置为严格模式，否则会报错。

    	- 箭头函数

    		- 箭头函数和普通函数的区别

    			- 1. 箭头函数比普通函数更加简洁

a.如果没有参数，写一个空括号即可
b.只有一个参数，可以省去参数的括号
c.如果函数体只有一行，可以省去大括号 2. 箭头函数没有自己的 this
箭头函数不会创建自己的 this，他的 this 永远指向定义他时所在的 this，即自己所用域的上一级的 this，而不是使用时所在的对象。并且，箭头函数内的 this 是固定的，不可变的。 3. 不能用作构造函数，因为他没有自己的 this 4. 没有 arguments，在箭头函数中访问 arguments 实际上获取到的是他外层函数的 arguments 值 5. 没有 prototype 6. 不能用作 generator 函数，不能使用 yeild 关键字

    				- function foo() {

setTimeout(() => {
console.log('箭头函数：id', this.id);
}, 100);
setTimeout(function(){
console.log('普通函数：id',this.id)}, 100)
}
var id = 21;
foo.call({ id: 42 });

// 箭头函数：id 42
// 普通函数：id 21 普通函数，this 指向 window

    - 数组的扩展

    	- 扩展运算符
    	- find(), findIndex(), includes()是否包含某个值, keys(), values()

    - 对象的扩展

    	- 对象的简洁写法：es6允许在大括号内直接写入变量和函数，作为对象的属性和方法
    	- 属性名表达式，es6允许使用字面量创建对象时，用表达式作为属性名或方法名，把表达式放在方括号内，如obj={['a'+'b']: 123}

注意，如果属性名是一个对象，那么默认情况下，会将对象转为字符串[object Object] - 对象方法的 name 属性，方法名 - 属性的可枚举性和遍历：对象的每个属性都有一个描述对象 Descriptor，用来控制该属性的行为。Object.getOwnPropertyDescriptor 方法可以获取该属性的描述对象。

    		- 描述对象的enumerate属性：可枚举性，如果属性值为false，表示某些操作会忽略当前的属性，如：for...in循环、Object.keys、JSON.stringify、Object.assign
    		- 遍历属性的方法

1.for...in：遍历对象自身的属性和继承的可枚举属性
2.Object.keys：返回一个数组，包括对象自身的所有可枚举属性的键名
3.Object.getOwnPropertyNames：返回一个包含自身的所有属性的数组（不包含 Symbol 属性）
4.Object.getOwnPropertySymbols：返回一个包含自身所有 Symbol 属性的键名的数组
5.Reflect.ownKeys：返回一个包含所有属性的数组，包含 Symbol 属性

    	- 对象的新增方法

    		- Object.assign(target，source1，source2)：用来合并对象，将源对象的所有可枚举的属性与目标对象合并
    		- Object.keys()返回对象的所有可遍历的键名，Object.values()返回对象的所有可遍历的键值，

Object.entires()返回对象的所有可遍历的键值对数组 - Object.fromEntires()这个方法是 Object.entires()的逆操作，可以将一个键值对数组转换为对象

    - Symbol

    	- 子主题 1

    - set和map数据结构

- 原型和继承

  - 什么是原型链？
  - js 实现继承的几种方式

- 面向对象

  - 什么是面向对象？面向对象有什么特点？

- 设计模式
- 发布订阅模式
- 节流和防抖，以及使用场景
- 同步异步，Promise，async await
- 事件循环 Event Loop
- 垃圾回收机制
- WebWorker
- 正则
- JS 模块化

### 算法

- 数据结构
- 算法复杂度分析
- 算法题

  - 数组去重的几种方法
  - 数组拍平
  - 如何将类数组转换为数组？
  - 六大排序算法
  - 手写 Promise
  - 手写防抖、节流函数
