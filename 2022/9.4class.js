// 最标准的面向对象实现模式  基于原型继承的构造函数
// 创建一个圆构造函数
function Circle (center, radius){
  this.center = center
  this.radius = radius
}
// 计算圆的周长
Circle.prototype.getCircumReference = function(){
  return 2*Math.PI*this.radius
}

// 使用class
// class Circle {
//   // 构造器
//   constructor(center, radius) {
//     this.center = center
//     this.radius = radius
//   }
//   // 方法
//   getCircumReference() {
//     return 2 * Math.PI * this.radius
//   }
// }

// 创建一个圆的实例
const c1 = new Circle(1, 5)
console.log(c1, c1.prototype)
// console.log(Object.getPrototypeOf(c1) === Circle.prototype);//true
// console.log(c1.getCircumReference())
