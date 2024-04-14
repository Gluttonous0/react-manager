import { useEffect } from 'react'
import request from '@/utils/request'
export default function Login() {
  useEffect(() => {
    request
      .post('./users', {
        id: 12345
      })
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log('error:', error)
      })
  }, [])
  return (
    <>
      <div>Login</div>
    </>
  )
}
