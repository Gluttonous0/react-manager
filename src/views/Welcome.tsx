import { Button } from 'antd'
import request from '@/utils/request'
import { useEffect } from 'react'
import storage from '@/utils/storage'
export default function Welcome() {
  useEffect(() => {
    request.post('/users/login', {})
  }, [])
  const handleClick = () => {
    request.post('/users/login', {})
  }
  const handleStorage = (num: number) => {
    if (num === 1) {
      storage.set('age', 30)
      storage.set('user', { name: 'jack', age: '30' })
    } else if (num === 2) {
      console.log(storage.get('user'))
    } else if (num === 3) {
      storage.remove('age')
    } else {
      storage.clear()
    }
  }
  return (
    <div className='welcome'>
      <p>Welcome</p>
      <p>
        <Button onClick={handleClick}>点击事件</Button>
        <Button onClick={() => handleStorage(1)}>写入值</Button>
        <Button onClick={() => handleStorage(2)}>读取值</Button>
        <Button onClick={() => handleStorage(3)}>清空值</Button>
        <Button onClick={() => handleStorage(4)}>清空所有</Button>
      </p>
    </div>
  )
}
