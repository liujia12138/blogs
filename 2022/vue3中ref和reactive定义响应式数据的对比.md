### ref 和 reactive 的对比

#### 从定义数据的角度
1. ref定义基本数据类型，reactive用来定义对象或数据
2. ref也可以用来定义对象或数组，内部进行了处理，通过reactive转为对象

#### 从原理角度
1. ref通过Object.defineProperty()的get和set实现响应式
2. reactive通过es6 的Proxy来实现响应式，并通过Reflect操作源对象内部的数据

#### 从使用的角度
1. ref定义的数据，操作时需要.value，在模板中读取数据时不需要.value
2. reactive定义的数据，操作和读取均不需要.value
