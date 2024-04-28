// keyof 获取键值

interface User {
  id: number
  name: string
  age: number
}

type Keys = keyof User

const user = { name: 'jack', age: 30 }

type User1 = typeof user

interface User2 {
  [k: string]: any
}

type User3 = {
  [k in Keys]: any
}
const tom: User3 = { id: 1, name: 'jack', age: 30 }

export default {}
