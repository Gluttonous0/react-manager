import api from '@/api/api'
// import { useDeptStore } from '@/store'
import { Menu } from '@/types/api'
import { IAction, ImodalProp } from '@/types/modal'
import { Form, Input, InputNumber, Modal, Radio, Select, TreeSelect } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useImperativeHandle, useState } from 'react'
import storage from '@/utils/storage'
import { message } from '@/utils/AntdGlobal'
import { InfoCircleOutlined } from '@ant-design/icons'

export default function CreateMenu(props: ImodalProp<Menu.EditParams>) {
  const [form] = useForm()
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>([])

  //获取菜单列表
  const getMenuList = async () => {
    await api.getMenuList()
    setMenuList(storage.get('menuList'))
  }

  //弹窗暴露
  useImperativeHandle(props.mRef, () => ({
    open
  }))
  //打开弹框函数
  const open = (type: IAction, data?: Menu.EditParams | { parentId: string }) => {
    getMenuList()
    setAction(type)
    setVisible(true)
    if (data) {
      form.setFieldsValue(data)
    }
  }

  //提交表单
  const handleSubmit = async () => {
    const vaild = await form.validateFields()
    if (vaild) {
      if (action === 'create') {
        let newData = form.getFieldsValue()
        let updateList = storage.get('menuList')
        let arrData = {
          createId: Math.random().toString(),
          createTime: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
          updateTime: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
          id: Math.random().toString(),
          children: []
        }
        const newsData = { ...newData, ...arrData }
        console.log(updateList)
        console.log(newsData)
        if (!newData.parentId) {
          newData.parentId = ''
          updateList.push(newsData)
          storage.set('menuList', updateList)
          setMenuList(updateList)
          await api.createMenu(newsData)
        }
      } else {
        console.log(form.getFieldsValue())
        await api.editMenu(form.getFieldsValue())
        const editData = form.getFieldsValue()
        let deptsList = storage.get('menuList')
        let newEditDept = deptsList.map((item: any) => {
          if (item.id === editData.id) {
            return { ...item, ...editData }
          } else {
            return item
          }
        })
        console.log(newEditDept)
        storage.set('menuList', newEditDept)
        // updateStore(newEditDept)
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
      title={action === 'create' ? '创建菜单' : '编辑菜单'}
      width={800}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelAlign='right' labelCol={{ span: 3 }}>
        <Form.Item label='菜单ID' name='id' hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item label='父级菜单' name='parentId'>
          <TreeSelect
            placeholder='请选择父级菜单'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'menuName', value: 'id' }}
            treeData={menuList}
          />
        </Form.Item>
        <Form.Item label='菜单类型' name='menuType'>
          <Radio.Group defaultValue={1}>
            <Radio value={1}>菜单</Radio>
            <Radio value={2}>按钮</Radio>
            <Radio value={3}>页面</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label='菜单名称' name='menuName' rules={[{ required: true, message: '请输入菜单名称' }]}>
          <Input placeholder='请输入菜单名称' />
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {() => {
            return form.getFieldValue('menuType') === 2 ? (
              <Form.Item label='权限标识' name='menuCode'>
                <Input placeholder='请输入权限标识' />
              </Form.Item>
            ) : (
              <>
                <Form.Item label='菜单图标' name='icon'>
                  <Input placeholder='请输入菜单图标' />
                </Form.Item>
                <Form.Item label='路由地址' name='path'>
                  <Input placeholder='请输入路由地址' />
                </Form.Item>
              </>
            )
          }}
        </Form.Item>

        <Form.Item label='组件名称' name='component'>
          <Input placeholder='请输入组件名称' />
        </Form.Item>
        <Form.Item label='排序' name='orderBy' tooltip={{ title: '排序值越大越靠后', icon: <InfoCircleOutlined /> }}>
          <InputNumber placeholder='请输入排序值' style={{ width: 120 }} />
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState'>
          <Radio.Group defaultValue={1}>
            <Radio value={1}>启用</Radio>
            <Radio value={2}>停用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}
