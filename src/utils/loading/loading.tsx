import { Flex, Spin } from 'antd'
import './loading.less'

export default function Loading() {
  return (
    <>
      <Flex align='center' gap='middle'>
        <Spin size='large' />
        加载中
      </Flex>
    </>
  )
}
