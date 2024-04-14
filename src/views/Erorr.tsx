import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function Error() {
  const navigate = useNavigate()
  const handClick = () => {
    navigate('/')
  }
  return (
    <Result
      status={403}
      title='403'
      subTitle='抱歉，您没有权限访问此页面。'
      extra={
        <Button type='primary' onClick={handClick}>
          返回首页
        </Button>
      }
    />
  )
}
