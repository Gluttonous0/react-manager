import api from '@/api/roleApi'
import { AnyObject, Role } from '@/types/api'
import { IAction , ImodalProp} from '@/types/modal'
import { Form, Input, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useImperativeHandle, useState } from 'react'

export default function CreateRole(props:ImodalProp<Role.RoleItem>) {
  const [form] = useForm()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')

  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  //调用弹窗显示方法
  const open = (type: IAction, data?: AnyObject) => {
    setAction(type)
    setVisible(true)
    if(data) {
      form.setFieldsValue(data)
    }
  }
  //提交事件
  const handleOk = async() => {
    const valid = await form.validateFields()    
    if(valid){
      const params = form.getFieldsValue()
      if(action === 'create'){
        await api.createRole(params)
      } else {
        await api.editRole(params)
      }
    }
  }

  //取消事件
  const handleCancle = () => {
    setVisible(false)
    form.resetFields()
  }
  return (
    <Modal
      title={action==='create'?'新增角色':'编辑角色'}
      width={700}
      open={visible}
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
