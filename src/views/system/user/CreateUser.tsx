import { Modal, Form, Input, Select, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
import storage from '@/utils/storage'

const CreateUser = () => {
  const [form] = Form.useForm()
  const [showUpload, setShowUpload] = useState(false)
  const handleSubmit = async () => {
    const valid = await form.validateFields()
    console.log(valid)
  }
  const handleCancel = () => {}

  //上传之前,接口处理
  const beforeUpload = () => {}

  //上传后,图片处理
  const handleChange = () => {}

  return (
    <Modal
      title='创建用户'
      okText='确定'
      cancelText='取消'
      width={800}
      open={true}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form labelCol={{ span: 4 }} labelAlign='right' form={form}>
        <Form.Item label='用户名称' name='userName' rules={[{ required: true, message: '请输入用户名称' }]}>
          <Input placeholder='请输入用户名称'></Input>
        </Form.Item>
        <Form.Item label='用户邮箱' name='userEmail' rules={[{ required: true, message: '请输入用户邮箱' }]}>
          <Input placeholder='请输入用户邮箱'></Input>
        </Form.Item>
        <Form.Item label='手机号码' name='mobile'>
          <Input type='number' placeholder='请输入手机号'></Input>
        </Form.Item>
        <Form.Item label='用户部门' name='deptId' rules={[{ required: true, message: '请输入用户部门' }]}>
          <Input placeholder='请输入部门'></Input>
        </Form.Item>
        <Form.Item label='用户岗位' name='Job'>
          <Input placeholder='请输入岗位'></Input>
        </Form.Item>
        <Form.Item label='用户状态' name='state'>
          <Select>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='角色职位' name='roleList'>
          <Input placeholder='请输入角色'></Input>
        </Form.Item>
        <Form.Item label='用户头像'>
          <Upload
            listType='picture-circle'
            showUploadList={false}
            headers={{
              Authorization: 'Bearer' + storage.get('token')
            }}
            action='/api/users/upload'
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {showUpload ? <LoadingOutlined /> : <PlusOutlined />}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateUser
