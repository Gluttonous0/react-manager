import { IAction } from '@/types/modal'
import { Modal } from 'antd'
import { useState } from 'react'

export default function CreateDept() {
  const [action, setAction] = useState<IAction>('create')

  //提交表单
  const handleSubmit = () => {}
  //取消表单
  const handleCancel = () => {}
  return (
    <Modal
      title={action === 'create' ? '创建部门' : '编辑部门'}
      width={800}
      open={true}
      okText='确定'
      cancelText='取消'
      onOk={handleSubmit}
      onCancel={handleCancel}
    ></Modal>
  )
}
