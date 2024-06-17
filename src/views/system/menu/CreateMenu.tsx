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
  const [menuTypeNum, setMenuTypeNum] = useState(1)
  const [menuStatusNum, setMenuStatusNum] = useState(1)
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>([])

  useEffect(() => {
    form.setFieldsValue({
      menuStatus: 1,
      menuType: 1
    })
  }, [visible])
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
        for (let k in newData) {
          if (k === 'id') {
            newData[k] = Math.random().toString()
          } else if (!newData[k]) {
            newData[k] = ''
          }
        }
        newData = {
          ...newData,
          createTime: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
        }
        console.log(newData)
        const data = await api.createMenu(newData)
        let upMenuList = storage.get('menuList')
        upMenuList = [...upMenuList, data]
        storage.set('menuList', upMenuList)
        setMenuList(upMenuList)
      } else {
        const editData = form.getFieldsValue()
        const data = await api.editMenu(editData)
        let deptsList = storage.get('menuList')
        let newEditDept = deptsList.map((item: Menu.MenuItem) => {
          if (item.id === data.id) {
            return { ...item, ...data }
          } else {
            return item
          }
        })
        storage.set('menuList', newEditDept)
        setMenuList(newEditDept)
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
  //切换菜单类型单选
  const changeMenuType = (e: any) => {
    console.log(e.target.value)
    setMenuTypeNum(e.target.value)
  }
  //切换菜单状态单选
  const changeMenuStatus = (e: any) => {
    console.log(e.target.value)
    setMenuStatusNum(e.target.value)
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
      forceRender
    >
      <Form
        form={form}
        labelAlign='right'
        labelCol={{ span: 3 }}
        initialValues={{ menuStatus: menuStatusNum, menuType: menuTypeNum }}
      >
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
          <Radio.Group onChange={changeMenuType}>
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
        <Form.Item label='菜单状态' name='menuStatus'>
          <Radio.Group onChange={changeMenuStatus}>
            <Radio value={1}>启用</Radio>
            <Radio value={2}>停用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}
