import styles from './index.module.less'
import { Button, Form, Input } from 'antd'
// import './index.css'

type FieldType = {
  username?: string
  password?: string
  remember?: string
}

export default function Login() {
  const onFinish = () => {
    console.log('values')
  }

  return (
    <div className={styles.login}>
      <div className='login-wrapper'>
        <div className='title'>系统登录</div>
        <Form name='basic' initialValues={{ remember: true }} onFinish={onFinish} autoComplete='off'>
          <Form.Item<FieldType> rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType> rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
