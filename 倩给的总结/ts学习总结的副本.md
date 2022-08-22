#### ts应该知道的高级概念
	
#### 接口
	1.定义   
		接口就是用来约束对象的结构，拿一个对象去实现一个接口,他就必须要去拥有这个接口当中所约束的所有的成员。
	2. 编译
		编译一下这个代码，编译过后我们打开对应的js文件，在js当中并不会发现任何跟接口相关的代码，也就是说ts中的接口他只是用来为我们有结构的数据去做类型约束的，在实际运行阶段呢，实际这种接口并没有意义。
	3. 可选成员，只读成员

#### 类的访问修饰符
	1. private 私有属性，外部不能够访问
	2. public 公共属性 ，默认修饰符就是public
	3. protected 不能在外部直接访问，只允许在子类中去访问对应的成员

#### 抽象类
	抽象类可以包含一些具体的实现，而接口他只能够是一个成员的抽象，不包含具体的实现。
	abstract关键字是用于定义抽象类和在抽象类内部定义抽象的方法。
	抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。
	抽象方法的语法与接口相似，两者都是定义方法签名但不包含方法体。
	然而，抽象方法必须包含abstract关键字并且可以包含访问修饰符。

#### 抽象类和普通类之间的区别
	1. abstract类中可以有abstract方法，也可以有非abstract方法呢
	2. 非abstract类不可以有abstract方法
	3. abstract类不能使用new运算符创建对象（final和abstarct，private和abstract，static和abstract，这些是不能放在一起的修饰符，因为abstarct修饰的方法必须在其子类中实现，才能以多态方式调用，以上修饰符在修饰方法时期子类都覆盖不了这个方法，final是不可以覆盖的，private是不能够继承到子类，所以也就不能够覆盖，static是可以覆盖的，但是调用时会调用编译时类型的方法，因为调用的是父类的方法，而父类的方法又是抽象的方法，又不能够调用，所以以上修饰符不能放在一起）

#### 泛型
	1. 定义:是指在定义函数，接口或者类的时候，不预先指定其类型，而是在使用时手动指定其类型的一种特性。
	2. 用法:在函数名后面加了，其中的T表示任意输入的类型，后面的T即表示输出的类型，且与输入保持一致
		
		interface lengthwise {
		  length: number
		}
		
		function loggingIdentity<T extends lengthwise>(arg: T): T {
		  console.log(arg.length)   // err 
		  return arg
		}
		
		loggingIdentity({a: 1, length: 1})  // 1
		loggingIdentity('str') // 3
		loggingIdentity(6) // err  传入是参数中未能包含 length 属性

