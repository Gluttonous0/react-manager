import { Form, Input, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useState } from 'react'

export default function CreateRole() {
  const [form] = useForm()
  const [visible, setVisible] = useState(false)

  //提交事件
  const handleOk = () => {}

  //取消事件
  const handleCancle = () => {}
  return (
    <Modal
      title='新增角色'
      width={700}
      open={true}
      okText='确定'
      cancelText='取消'
      onOk={handleOk}
      onCancel={handleCancle}
    >
      <Form form={form} labelAlign='right' labelCol={{ span: 4 }}>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
        <Form.Item name='roleName' label='角色名称' rules={[{ required: true, message: '请输入角色名称' }]}>
          <Input placeholder='请输入角色名称' />
        </Form.Item>
        <Form.Item name='remark' label='备注'>
          <Input.TextArea placeholder='请输入备注' />
        </Form.Item>
      </Form>
    </Modal>
  )
}
