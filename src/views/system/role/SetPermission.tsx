import api from '@/api/api'
import roleApi from '@/api/roleApi'
import { AnyObject, Menu, Role } from '@/types/api'
import { IAction, ImodalProp } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'
import { Form, Input, Modal, Tree, TreeDataNode } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useImperativeHandle, useState } from 'react'

export default function SetPermission(props: ImodalProp<Role.RoleItem>) {
  const [visible, setVisible] = useState(false)
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>([])
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])
  const [roleInfo, setRoleInfo] = useState<Role.RoleItem>()
  const [permission, setPermission] = useState<Role.Permission>()
  console.log(menuList)
  useEffect(() => {
    getRoleTreeList()
  }, [])

  //获取部门数列表
  const getRoleTreeList = async () => {
    const menuList = await api.getMenuList()
    setMenuList(menuList)
  }

  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  //调用弹窗显示方法
  const open = (type: IAction, data?: Role.RoleItem) => {
    console.log(data)
    setVisible(true)
    setRoleInfo(data)
    setCheckedKeys(data?.permissionList.checkedKeys || [])
  }
  //提交事件
  const handleOk = async () => {
    if (permission) {
      await roleApi.updatePermission(permission)
      message.success('设置成功')
      handleCancle()
    }
  }

  //取消事件
  const handleCancle = () => {
    setVisible(false)
    setPermission(undefined)
  }

  const onCheck = (checkedKeysValue: any, item: any) => {
    setCheckedKeys(checkedKeysValue)

    const checkedKeys: string[] = []
    const parentKeys: string[] = []
    item.checkedNodes.map((node: Menu.MenuItem) => {
      if (node.menuType === 2) {
        checkedKeys.push(node.id)
      } else {
        parentKeys.push(node.id)
      }
    })

    setPermission({
      id: roleInfo?.id || '',
      permissionList: {
        checkedKeys,
        halfCheckedKeys: parentKeys.concat(item.halfCheckedKeys)
      }
    })
  }

  return (
    <Modal
      title='设置权限'
      width={600}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleOk}
      onCancel={handleCancle}
    >
      <Form labelAlign='right' labelCol={{ span: 4 }}>
        <Form.Item label='角色名称'>{roleInfo?.roleName}</Form.Item>
        <Form.Item label='权限'>
          <Tree
            defaultExpandAll
            fieldNames={{
              title: 'menuName',
              key: 'id',
              children: 'children'
            }}
            checkable
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={menuList}
          ></Tree>
        </Form.Item>
      </Form>
    </Modal>
  )
}
