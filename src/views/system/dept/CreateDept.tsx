import api from '@/api/api'
import { useDeptStore } from '@/store'
import { Dept, User } from '@/types/api'
import { IAction, ImodalProp } from '@/types/modal'
import { Form, Input, Modal, Select, TreeSelect, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useImperativeHandle, useState } from 'react'

export default function CreateDept(props: ImodalProp) {
  const [form] = useForm()
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  const [deptList, setDeptList] = useState<Dept.DeptItem[]>([])
  const [temporaryDeptList, setTemporaryDeptList] = useState<Dept.DeptItem[]>([])
  const [editDeptList, setEditDeptList] = useState<Dept.DeptItem[]>([])
  const [usersAllList, setUsersAllList] = useState<User.UserItem[]>([])

  //设置临时储存zustand
  const deptStore = useDeptStore(state => state.deptList)
  const updateStore = useDeptStore(state => state.updateList)

  useEffect(() => {
    getDeptList()
    getAllUserList()
  }, [])

  // //useEffect监听回传数据
  // useEffect(() => {
  //   sendDataToParent(0)
  // }, [temporaryDeptList])
  // useEffect(() => {
  //   sendDataToParent(1)
  // }, [editDeptList])
  // //回传数据到父组件
  // const sendDataToParent = (num: number) => {
  //   if (num === 0) {
  //     props.onDataReceived(temporaryDeptList, num)
  //   }
  //   if (num === 1) {
  //     props.onDataReceived(editDeptList, num)
  //   }
  // }

  //获取部门列表
  const getDeptList = async () => {
    await api.getDeptList()

    setDeptList(deptStore)
    // if (temporaryDeptList) {
    //   setDeptList([...data, ...temporaryDeptList])
    // } else {
    //   setDeptList(data)
    // }
  }

  //获取所有用户列表列表
  const getAllUserList = async () => {
    const data = await api.getAllUserList()
    setUsersAllList(data)
  }

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
  const handleSubmit = async () => {
    const vaild = await form.validateFields()
    if (vaild) {
      if (action === 'create') {
        let newData = form.getFieldsValue()
        if (!newData.parentId) {
          newData.parentId = ''
        }
        let updateList = deptList
        let arrData = {
          createId: Math.random().toString(),
          createTime: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
          updateTime: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
          id: Math.random().toString()
        }
        newData = { ...newData, ...arrData }
        updateList.push(newData)
        console.log(newData);
        console.log('updateList', updateList);
        updateStore(updateList)
        console.log('deptStore', deptStore);
        await api.createDept(newData)
        // updateStore(updateData)
        // if (temporaryDeptList) {
        //   setTemporaryDeptList([...temporaryDeptList, newData])
        // } else {
        //   setTemporaryDeptList(newData)
        // }
      } else {
        console.log(form.getFieldsValue())
        await api.editDept(form.getFieldsValue())
        const editData = form.getFieldsValue()
        // let deptsList = [...deptList, ...temporaryDeptList]
        let deptsList = deptStore
        let newEditDept = deptsList.map(item => {
          if (item.id === editData.id) {
            return { ...item, ...editData }
          } else {
            return item
          }
        })
        console.log(newEditDept)
        updateStore(newEditDept)
      }
      message.success('操作成功')
      handleCancel()
      props.update()
    }
  }
  //关闭和重置弹框表单
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
        <Form.Item label='部门ID' name='id' hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item label='上级部门' name='parentId'>
          <TreeSelect
            placeholder='请选择上级部门'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'deptName', value: 'id' }}
            treeData={deptList}
          />
        </Form.Item>
        <Form.Item label='部门名称' name='deptName' rules={[{ required: true, message: '请输入部门名称' }]}>
          <Input placeholder='请输入部门名称' />
        </Form.Item>
        <Form.Item label='负责人' name='userName' rules={[{ required: true, message: '请选择负责人' }]}>
          <Select>
            {usersAllList.map(item => {
              return (
                <Select.Option value={item.userName} key={item.id}>
                  {item.userName}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
