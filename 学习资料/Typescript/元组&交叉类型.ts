// 元组

const list: [number, string, boolean, object] = [1, '2', true, {}]

// 交叉类型

type AgeType = { age: number }
type UserType = { id: number; name: string }
const user: UserType & AgeType = { id: 1, name: 'jack', age: 30 }

const userAge: AgeType = { age: 30 }

const userInfo: UserType = { id: 2, name: 'Tom' }
export default {}
