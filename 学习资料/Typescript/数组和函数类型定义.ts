// 数组类型定义

const list1: number[] = [1, 2, 3]

const list2: Array<number> = [1, 2, 3]

const list3: [number, string, boolean] = [1, '2', true]

const list4: [{ name: string; age: number }] = [{ name: 'jack', age: 30 }]

const list5: Array<{ name: string; age: number }> = [{ name: 'jack', age: 30 }]

interface User {
  name: string
  age: number
}
const list6: Array<User> = [{ name: 'jack', age: 30 }]

// 函数类型定义
function add1(a: number, b: number): number {
  return a + b
}

function add2(a: number, b: number): void {
  console.log(a, b)
}

function add3(a: number, b: number): unknown {
  throw new Error('Error')
}

const add4 = (a: number, b: number): number => {
  return a + b
}

const add5: (a: number, b: number) => number = (a, b) => {
  return a + b
}
export default {}
