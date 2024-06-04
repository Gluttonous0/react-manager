import api from '@/api/api'
import { Dept } from '@/types/api'
import { IAction, ImodalProp } from '@/types/modal'
import { Form, Input, Modal, Select, TreeSelect } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useImperativeHandle, useState } from 'react'

export default function CreateDept(props: ImodalProp) {
  const [form] = useForm()
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  const [deptList, setDeptList] = useState<Dept.DeptItem[]>([])

  useEffect(() => {
    getDeptList()
  }, [])

  //获取部门列表
  const getDeptList = async () => {
    const data = await api.getDeptList()
    setDeptList(data)
  }

  //获取所有用户列表列表
  const getAllUserList = () => {}

  //弹窗暴露
  useImperativeHandle(props.mRef, () => ({
    open
  }))
  //打开弹框函数
  const open = (type: IAction, data?: Dept.EditParams | { parentId: string }) => {
    setAction(type)
    setVisible(true)
    if (type === 'edit' && data) {
      form.setFieldsValue(data)
    }
  }

  //提交表单
  const handleSubmit = () => {}
  //取消表单
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }
  return (
    <Modal
      title={action === 'create' ? '创建部门' : '编辑部门'}
      width={800}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelAlign='right' labelCol={{ span: 3 }}>
        <Form.Item label='上级部门' name='parentId'>
          <TreeSelect
            placeholder='请选择上级部门'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'deptName', value: 'id' }}
            treeData={deptList}
          />
        </Form.Item>
        <Form.Item label='部门名称' name='deptName'>
          <Input placeholder='请输入部门名称' />
        </Form.Item>
        <Form.Item label='负责人' name='userName'>
          <Select>
            <Select.Option value='jack' key='jack'>
              jack
            </Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
