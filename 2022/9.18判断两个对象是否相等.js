console.log(fn)
function isObjectValueEqual(obj1, obj2) {
  // 1.判断引用地址是否一致，一致则直接返回true
  if (Object.is(obj1, obj2)) return true
  const props1 = Object.getOwnPropertyNames(obj1)
  const props2 = Object.getOwnPropertyNames(obj2)
  // 2.判断键名数组长度是否一致，不一致则直接返回false
  if (props1.length !== props2.length) return false
  // 3.键名数组长度一致，遍历键名数组，判断所有值是否一致
  for (let prop in obj1) {
    // 3.1判断obj1的键值在obj2中是否存在，存在则进一步判断值，不存在直接返回false
    if (obj2.hasOwnProperty(prop)) {
      // 3.2判断obj1的键值是否为对象，是则递归判断，否则直接判断值是否相等
      if (typeof obj1[prop] === 'object') {
        if (!isObjectValueEqual(obj1[prop], obj2[prop])) return false
      } else {
        if (obj1[prop] !== obj2[prop]) return false
      }
    } else {
      return false
    }
  }
  return true
}
// function fn (){
//   return 'fn'
// }
var fn = 'aaa'
var varFunction = function () {
  return 'ss'
}
const obj1 = {
  name: '张三',
  age: 16,
  friends: {
    name: '小明'
  }
}

const obj2 = {
  name: '张三',
  age: 16
}

const obj3 = obj1

const obj4 = {
  name: '李四',
  age: 20,
  skills: ['抽烟', '喝酒']
}

const obj5 = {
  name: '李四',
  age: 20,
  skills: ['抽烟', '喝酒']
}

console.log(isObjectValueEqual(obj3, obj1))

console.log(obj4 == obj5)
