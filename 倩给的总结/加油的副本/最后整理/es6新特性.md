#### let const var关键字
	1.var存在变量提升，let和const不存在变量提升
	2.var是全部变量，let和const都是块级作用域
	3.var可以重复声明，但是const和let不可以重复声明
	4.var和let可以重新赋值，但是const不可以重新赋值
#### 什么是暂时性死区？
	let和const声明的变量不存在变量提升，其作用域都是块级作用域，凡是声明变量之前使用变量就会报错，所以在代码块内，使用let声明变量之前，该变量都是不可用的。在语法上成为“暂时性死区”
	
#### 字符串的扩展方法
	includes();
	startWith(); //是否以某个字符串开头
	endsWith(); //是否以某个字符串结尾
	
	返回的都是true/false

#### 对象新增的方法
	1.Object.assign()方法用于对象的合并，将源对象的可枚举属性，复制到目标对象
		如果目标对象与源对象有同名属性，则后面的会覆盖前面属性
		如果该参数不是对象，则会先转成对象，然后返回
		
		实行的是浅拷贝
		
		数组处理：会先把数组看成对象
		
	2.Object.is() 用来比较两个值是否严格相等
		不同之处：
			Object.is(+0,-0) false
			Object.is(NaN,NaN) true
			
#### Proxy
	用于创建一个对象的代理，从而实现基本操作的拦截和自定义(如属性查找，复制，枚举，函数调用等)
	const p = new Proxy(target,handler)
	
	target要使用proxy包装的目标对象
	handler一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行哥哥操作时代理p的行为	
	两个重要的对象方法
		1.handler.get()用于拦截对象的读取属性的操作
		2.handler.set()用于设置属性之操作的捕获器
			const p = new Proxy(target,{
				get:function(target,property,receiver){
					
				},
				set:function(target,property,value,receiver){
					
				}
			})
			target:目标对象
			property：将被设置的属性名
			value：新属性值
			receiver:最初被调用的对象
#### Proxy对比Object.defineProperty()
1.Proxy可以监视读写以外的操作
2.Proxy可以很方便的监视数组的操作
3.Proxy不需要侵入对象
		
#### class类声明
	函数声明和类声明之间的一个重要区别在于：函数声明会提升。类声明不会
	
	构造函数
		constructor方法是类构造函数，是一个默认方法，通过new创建实例的时候，自动调用该方法
		
	静态方法
		static关键字用来定义一个类的静态方法。调用静态方法不需要实例化该类，但是不能通过该类的实例调用静态的方法。静态方法通常用于作为一个应用程序创建工具函数
	
	继承extends
		在类声明和类表达式中用于创建一个类作为另一个类的子类
		
#### set
	set对象是值的集合，set中的元素都是唯一的
	
	const mySet = new set();
	
		1.mySet.add() 添加一个元素
		2.mySet.clear() 移除所有的元素
		3.mySet.delete() 删除某一个元素
		4.mySet.has() 判断是否存在这个值
		5.mySet.size() set的长度
		6.mySet.entries() 返回一个新的迭代对象，该对象中包函数值[value,value]
		7.mySet.values() 
		8.mySet.keys()
		
	数组去重
	
	与Array相比：
		1.Set中存储的元素是唯一的
		2.set中遍历元素的方式：set通过for...of，而array是通过for...in
		3.set是集合，不能像数组用下标取值
	
	Array.from(new Set([1,2,3]));	
#### map
	保存键值对，并且能够记住键的原始插入顺序，任何值都可以作为一个键或者是一个值
	
	.set增加键 myMap.set({},'12112')
	.get读取值 myMap.get({})
	
	使用for...of/forEach来迭代map
	
	与map和Objects相比较
		1.键的类型：一个map的键可以是任意值，一个object的键必须是一个string或者是一个symbol
		2.键的顺序：map中的key是有顺序的，一个object的键是无序的
		3.size:map存在size属性，object的键值对个数至能手动计算
		4.性能：在频繁增删键值对的场景下表现更好，而object在频繁增删键值对的场景下未作出优化
		
#### symbol
	是一种基本数据类型。symbol函数会返回symbol类型的值，该类型具有静态属性和静态方法。它的静态属性会暴露几个内建的成员对象；他的静态方法会暴露全局的symbol注册。
	每一个symbol返回的symbol值都是唯一的,一个symbol值能作为一个对象属性的标识符。
	
### es7
	1.求幂运算符**
		es7以前，我们都会通过内置对象Math.pow(2,3)来表示2的3次方(2^3)
		es7版本出来以后，我们可以通过求幂运算符2**3
		
	2. 数组的includes方法
	
#### es8
	1.async与await ---异步请求方式
		
	2.Object.values()与Object.entries()
		如果对象的内部属性名都是number类型，那么返回的结果会按照number的大小进行排序，顺序为升序
	3.padStart和padEnd
		padStart用于补充字符串的前面，padEnd用于补充字符串的后面
		1.超出则截断 'abc'.padStart(10,'0123456789') => '0123456abc'
		2.省略第二个参数，则用空格补全 'x'.padStart(4) => '   x'
		
	4.Object.getOWnPropertyDescriptors() 返回属性的描述对象
			
		
	