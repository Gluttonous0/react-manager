// 接口类型定义

interface Person {
  name: string
  age: number
}

const jack: Person = {
  name: 'jack',
  age: 30
}

const tom: Person = {
  name: 'jack',
  age: 30
}

interface P {
  readonly name: string
  age?: number
}

const lily: P = {
  name: 'lily'
}

// lily.name = 'Tom'

interface T {
  name: string
  age: number
  [k: string]: string | number
}

const a: T = {
  name: 'jack',
  age: 30,
  id: 1,
  gender: 'male',
  edu: '本科'
}

interface Sum {
  (x: number, y: number): number
}
type Sum1 = (x: number, y: number) => number

const add: Sum1 = (x, y) => {
  return x + y
}

interface U {
  id: number
  name: string
}

interface Person1 extends U {
  age: number
}
interface Person1 {
  gender: string
}

const tim: Person1 = {
  id: 1,
  name: 'tim',
  age: 30,
  gender: 'male'
}

type U1 = { id: number; name: string }
type Person2 = { age: number } | U1

const tim1: Person2 = {
  id: 1,
  name: 'tim',
  age: 30
}

export default {}
