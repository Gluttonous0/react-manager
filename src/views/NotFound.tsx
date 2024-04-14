import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()
  const handClick = () => {
    navigate('/')
  }
  return (
    <Result
      status={404}
      title='404'
      subTitle='抱歉，您访问的页面不存在。'
      extra={
        <Button type='primary' onClick={handClick}>
          返回首页
        </Button>
      }
    />
  )
}

export default NotFound
