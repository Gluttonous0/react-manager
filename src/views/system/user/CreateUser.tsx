import { Modal, Form, Input, Select, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useImperativeHandle, useState } from 'react'
// import storage from '@/utils/storage'
import type { GetProp, UploadProps } from 'antd'
import { message } from '@/utils/AntdGlobal'
import { UploadChangeParam } from 'antd/lib/upload'
import { IAction, ImodalProp } from '@/types/modal'
import { User } from '@/types/api'
import api from '@/api/api'
import axios from 'axios'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const CreateUser = (props: ImodalProp) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  const [showUpload, setShowUpload] = useState(false)
  const [newAdmin, setNewAdmin] = useState()
  const [image, setImage] = useState<string | undefined>()
  console.log(newAdmin)

  //暴露子组件open方法
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  //调用弹窗显示方法
  const open = (type: IAction, data?: User.UserItem) => {
    setAction(type)
    setVisible(true)
  }

  const handleSub = async (params: any) => {
    try {
      const data = await (await axios.post('http://localhost:5000/api/users/create', params)).data
      console.log(data)
      setNewAdmin(data.data)
    } catch (error) {
      console.error('Error sending request:', error)
    }
  }
  //提交表单
  const handleSubmit = async () => {
    const valid = await form.validateFields()
    console.log(valid)
    if (valid) {
      const params = {
        ...form.getFieldsValue(),
        userImg: image
      }
      if (action === 'create') {
        handleSub(params)
        message.success('创建成功')
        handleCancel()
      }
    }
  }
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
    props.update
  }

  //上传之前,接口处理 base64处理本地储存照片
  const beforeUpload = (file: FileType) => {
    console.log(file)

    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'

    if (!isJpgOrPng) {
      message.error('只能上传JPG/PNG格式的图片')
      return false
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片大小不能超过2M')
    }
    return isJpgOrPng
    // return false
  }

  //上传后,图片处理
  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      return
    }
    // else if (info.file.status === 'done') {
    //   message.success(`${info.file.name} file uploaded successfully.`)
    //   const data = api.createUser(info)
    // } else if (info.file.status === 'error') {
    //   message.error(`${info.file.name} file upload failed.`)
    // }
    if (info.file.originFileObj) {
      const reader = new FileReader()
      reader.onload = e => {
        const base64 = e.target?.result as string
        if (base64) {
          // 将Base64字符串赋值给状态，用于显示
          setImage(base64)
        }
      }
      reader.readAsDataURL(info.file.originFileObj)
    }
  }

  //

  return (
    <Modal
      title='创建用户'
      okText='确定'
      cancelText='取消'
      width={800}
      open={visible}
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
        <Form.Item label='用户部门' name='deptId'>
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
            // headers={{
            //   Authorization: 'Bearer' + storage.get('token')
            // }}
            action='https://mock.apifox.com/m1/4361209-4005003-default/api/users/upload'
            beforeUpload={beforeUpload}
            onChange={handleChange}
            // data={file=>{
            //   return file
            // }}
          >
            {image ? <img src={image} alt='pic' /> : showUpload ? <LoadingOutlined /> : <PlusOutlined />}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateUser
