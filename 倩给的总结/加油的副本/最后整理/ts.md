####  never 和 void 的区别
	1.void 表示没有任何类型（可以被赋值为 null 和 undefined）。
    2.never 表示一个不包含值的类型，即表示永远不存在的值。
    3.拥有 void 返回值类型的函数能正常运行。拥有 never 返回值类型的函数无法正常返回，无法终止，或会抛出异常。

#### 元祖类型的定义、
	元祖类型是一种特殊的数据结构，其实元祖就是一个明确元素数量以及每个元素类型的一个数组
	
#### 枚举的定义
	枚举就是一个对象的所有可能取值的集合
	
#### 枚举成员的特点
	1.是只读属性，无法修改
    2.枚举成员值默认从 0 开始递增，可以自定义设置初始值
		enum Gender {
			BOY = 1,
			GRIL
		}
		console.log(Gender.BOY);// 1
		console.log(Gender);// { '1': 'BOY', '2': 'GRIL', BOY: 1, GRIL: 2 }
	3.枚举成员值
		可以没有初始值
		可以是一个对常量成员的引用
		可以是一个常量表达式
		也可以是一个非常量表达式
		也可以是一个计算成员（紧跟在计算成员后面的枚举成员必须有初始值）
		
		enum Char {
		    // const member 常量成员：在编译阶段被计算出结果
		    a,				 // 没有初始值
		    b = Char.a,// 对常量成员的引用
		    c = 1 + 3, // 常量表达式
		  
		    // computed member 计算成员：表达式保留到程序的执行阶段
		    d = Math.random(),// 非常量表达式
		    e = '123'.length,
		    // 紧跟在计算成员后面的枚举成员必须有初始值
		    f = 6,
		    g
		}

#### 常量枚举与普通枚举的区别
	1.常量枚举会在编译阶段被删除
	2.常量枚举成员只能是常量成员
	3.常量枚举不能包含计算成员，如果包含了计算成员，则会在编译阶段报错
		const enum Colors {
		    Red,
		    Yellow,
		    Blue
		}
		// 常量枚举会在编译阶段被删除
		let myColors = [Colors.Red, Colors.Yellow, Colors.Blue];

#### 枚举的使用场景
	后端返回的字段使用 0 - 6 标记对应的日期，这时候就可以使用枚举可提高代码可读性
	enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
	
	console.log(Days["Sun"] === 0); // true
	console.log(Days["Mon"] === 1); // true
	console.log(Days["Tue"] === 2); // true
	console.log(Days["Sat"] === 6); // true
	
#### 什么是可索引类型接口
	一般用来约束数组和对象
	1.数字索引——约束数组
		只要 index 的类型是 number，那么值的类型必须是 string
		key 的类型为 number ，一般都代表是数组
		
		interface StringArray {
			[index:number]:string
		}
		let arr:StringArray = ['aaa','bbb'];
		console.log(arr);
			
	2.字符串索引——约束对象	
		只要 index 的类型是 string，那么值的类型必须是 string
		key 的类型为 string ，一般都代表是对象
		
		interface StringObject {
		  [index:string]:string
		}
		let obj:StringObject = {name:'ccc'};
		
####  什么是函数类型接口
	对方法传入的参数和返回值进行约束
	interface discount2{
	  // “:” 前面的是函数的签名，用来约束函数的参数
	  // ":" 后面的用来约束函数的返回值
	  (price:number):number
	}
	
#### 什么是类类型接口
	1.对类的约束，让类去实现接口，类可以实现多个接口
	2.接口只能约束类的公有成员（实例属性/方法），无法约束私有成员、构造函数、静态属性/方法
	
####  什么是混合类型接口
    一个对象可以同时做为函数和对象使用
	interface FnType {
	    (getName:string):string;
	}
	
	interface MixedType extends FnType{
	    name:string;
	    age:number;
	}

####  什么是函数重载
	1.在 TypeScript 中，表现为给同一个函数提供多个函数类型定义，适用于接收不同的参数和返回不同结果的情况
	2.TS 实现函数重载的时候，要求定义一系列的函数声明，在类型最宽泛的版本中实现重载（前面的是函数声明，目的是约束参数类型和个数，最后的函数实现是重载，表示要遵循前面的函数声明。一般在最后的函数实现时用 any 类型）
	3.函数重载的声明只用于类型检查阶段，在编译后会被删除
	4.TS 编译器在处理重载的时候，会去查询函数申明列表，从上至下直到匹配成功为止，所以要把最容易匹配的类型写到最前面
	
#### 什么是访问控制修饰符
	class Father {
	    str: string; // 默认就是 public
	    public name: string;   // 在定义的类中、类的实例、子类、子类实例都可以访问
	    protected age: number; // 只能在定义的类和子类中访问，不允许通过实例（定义的类的实例和子类实例）访问
	    private money: number; // 只能在定义的类中访问，类的实例、子类、子类实例都不可以访问
	    constructor(name: string, age: number, money: number) {
	        this.name = name;
	        this.age = age;
	        this.money = money;
	    }
	
	    getName(): string {
	        return this.name;
	    }
	
	    setName(name: string): void {
	        this.name = name;
	    }
	}
	
	const fa = new Father('aaa', 18, 1000);
	console.log(fa.name);// aaa
	console.log(fa.age);// error
	console.log(fa.money);// error
	
	class Child extends Father {
	    constructor(name: string, age: number, money: number) {
	        super(name, age, money);
	    }
	
	    desc() {
	        console.log(`${this.name} ${this.age} ${this.money}`);
	    }
	}
	
	let child = new Child('bbb', 18, 1000);
	console.log(child.name);// bbb
	console.log(child.age);// error
	console.log(child.money);// error

#### 重写(override) vs 重载(overload)
	1.重写是指子类重写“继承”自父类中的方法
	2.重载是指为同一个函数提供多个类型定义
	
#### 继承 vs 多态
	1.继承：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
	2.多态：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应
	
#### 什么是泛型
	1.泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，使用时再去指定类型的一种特性。
	2.可以把泛型理解为代表类型的参数
	
#### 什么是类型谓词
	1.类型保护函数：要自定义一个类型保护，只需要简单地为这个类型保护定义一个函数即可，这个函数的返回值是一个类型谓词
	2.类型谓词的语法为 parameterName is Type 这种形式，其中 parameterName 必须是当前函数签名里的一个参数名
	
#### 可选链运算符的使用
	1.可选链运算符是一种先检查属性是否存在，再尝试访问该属性的运算符，其符号为 ?.
	2.如果运算符左侧的操作数 ?. 计算为 undefined 或 null，则表达式求值为 undefined 。否则，正常触发目标属性访问、方法或函数调用。
	
####  非空断言符的使用
	非空断言操作符--> 这样写只是为了骗过编译器，防止编译的时候报错，打包后的代码可能还是会报错
  root2!.style.color = 'red';
  
#### 空值合并运算符的使用
	|| 运算符的缺点： 当左侧表达式的结果是数字 0 或空字符串时，会被视为 false
	
#### typeof class 和直接用 class 作为类型有什么区别
	1.获取的是类的类型，该类型可以获取类上面的静态属性/方法
	2.获取的是实例的类型，该类型可以获取实例对象上的属性/方法
	
	class Greeter {
	    static message = 'hello';
	
	    greet(){
	        return Greeter.message;
	    }
	}
	
	// 获取的是实例的类型，该类型可以获取实例对象上的属性/方法
	let greeter1:Greeter = new Greeter();
	console.log(greeter1.greet());// 'hello'
	
	
	// 获取的是类的类型，该类型可以获取类上面的静态属性/方法
	let greeterTwo:typeof Greeter = Greeter;
	greeterTwo.message = 'hey';
	
	let greeter2:Greeter = new greeterTwo();
	console.log(greeter2.greet());// 'hey'

####  不必要的命名空间：命名空间和模块不要混在一起使用，不要在一个模块中使用命名空间，命名空间要在一个全局的环境中使用
 不应该在模块中使用命名空间或者说将命名空间导出： 使用命名空间是为了提供逻辑分组和避免命名冲突，模块文件本身已经是一个逻辑分组，并且它的名字是由导入这个模块的代码指定，所以没有必要为导出的对象增加额外的模块层。
	
	export class Triangle { /* ... */ }
	export class Square { /* ... */ }
	
	import * as shapes from "./shapes";
	let t = new shapes.Triangle();

####  扩展全局变量的类型
	interface String {
	    // 这里是扩展，不是覆盖，所以放心使用
	    double(): string;
	}
	
	String.prototype.double = function () {
	    return this + '+' + this;
	};
	console.log('hello'.double());
	
	// 如果加了这个，就会报错
	// export {}

#### export = xxx 和 import xxx = require('xxx')
	为了支持 CommonJS 和 AMD 的 exports，TypeScript 提供了 export = 语法。export = 语法定义一个模块的导出对象。 这里的对象一词指的是类，接口，命名空间，函数或枚举。若使用 export = 导出一个模块，则必须使用 TypeScript 的特定语法 import module = require("module") 来导入此模块。
	
#### 使用 as 替代尖括号表示类型断言
	1.在 TS 可以使用尖括号来表示类型断言，但是在结合 JSX 的语法时将带来解析上的困难。因此，TS 在 .tsx 文件里禁用了使用尖括号的类型断言。
	2.as 操作符在 .ts 文件和 .tsx 文件里都可用
	
#### 不要使用如下类型 Number，String，Boolean、Object，应该使用类型number、string、boolean、object

#### 如何在解构一个函数 function fn({ x: number }) { /* ... */ } 时，即能给变量声明类型，又能给变量设置默认值
	// error
	function f({ x: number }) {
		console.log(x);
	}

	// ok
	function f({x}: { x: number } = {x: 0}) {
		console.log(x);
	}

#### 无法使用 for of 遍历 map 数据
####  有时候我们需要复用一个类型，但是又不需要此类型内的全部属性，因此需要剔除某些属性
	interface User {
	    username: string
	    id: number
	    token: string
	    avatar: string
	    role: string
	}
	type UserWithoutToken = Omit<User, 'token'>
	
#### 为什么在 exclude 列表里的模块还会被编译器使用
####  import * as React from 'react' 和 import React from 'react' 有什么区别
	1.第一种写法是将所有用 export 导出的成员赋值给 React ，导入后用 React.xxx 访问
2.

第二种写法仅是将默认导出（export default）的内容赋值给 React


