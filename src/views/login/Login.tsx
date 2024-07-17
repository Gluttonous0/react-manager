/**
 * 登录页面
 */
import styles from './index.module.less'
import { Button, Form, Input, message } from 'antd'
import api from '@/api/api'
import { Logins } from '@/types/api'
import storage from '@/utils/storage'
import { useState } from 'react'
import store from '@/store'
// type FieldType = {
//   username?: string
//   password?: string
//   remember?: string
// }

export default function Login() {
  const [loading, setLoading] = useState(false)
  const onFinish = async (values: Logins.params) => {
    try {
      setLoading(true)
      const data: any = await api.login({ ...values, userPwd: btoa(values.userPwd) })
      console.log(data.code)
      setLoading(false)
      storage.set('token', data)
      store.token = data
      message.success('登录成功')
      const params = new URLSearchParams(location.search)
      setTimeout(() => {
        location.href = params.get('callback') || '/'
      })
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div className={styles.login}>
      <div className='login-wrapper'>
        <div className='title'>系统登录</div>
        <Form name='basic' initialValues={{ remember: true }} onFinish={onFinish} autoComplete='off'>
          <Form.Item name='userName' rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>

          <Form.Item name='userPwd' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' block loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
