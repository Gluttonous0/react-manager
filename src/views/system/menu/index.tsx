import { Button, Form, Input, Modal, Select, Space, Table } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useRef, useState } from 'react'
import { Dept, Menu } from '@/types/api'
import api from '@/api/api'
import { IAction } from '@/types/modal'
import { ColumnsType } from 'antd/es/table'
import storage from '@/utils/storage'
import { message, modal } from '@/utils/AntdGlobal'
import CreateMenu from './CreateMenu'

export default function MenuList() {
  const [form] = useForm()
  const [data, setData] = useState<Menu.MenuItem[]>([])
  const menuRef = useRef<{
    open: (type: IAction, data?: Menu.EditParams | { parentId?: string; orderBy?: number }) => void
  }>()

  //列表初始化调用接口
  useEffect(() => {
    getMenuList()
  }, [])

  //调用apifox接口返回菜单列表
  const getMenuList = async () => {
    const data = await api.getMenuList(form.getFieldsValue())
    if (storage.get('menuList')) {
      storage.set('menuList', storage.get('menuList'))
      setData(storage.get('menuList'))
      console.log('更新菜单缓存')
    } else {
      storage.set('menuList', data)
      setData(data)
      console.log('初始化列表')
    }
  }

  //重置按钮
  const handleReset = () => {
    form.resetFields()
    getMenuList()
  }

  //创建菜单
  const handleCreate = () => {
    menuRef.current?.open('create', {
      orderBy: data.length
    })
  }

  //创建子级菜单
  const handleSubCreate = (record: Menu.MenuItem) => {
    menuRef.current?.open('create', { parentId: record.id, orderBy: record.children?.length })
  }

  //编辑菜单
  const handleEdit = (record: Menu.MenuItem) => {
    console.log(record)
    menuRef.current?.open('edit', record)
  }

  //删除菜单
  const handleDelete = (record: Menu.MenuItem) => {
    let text = ''
    if (record.menuType === 1) text = '菜单'
    if (record.menuType === 2) text = '按钮'
    if (record.menuType === 3) text = '页面'
    modal.confirm({
      title: '确认',
      content: `确认删除该${text}吗?`,
      onOk() {
        handleDeleteSumbit(record.id)
      },
      okText: '确认',
      cancelText: '取消'
    })
  }
  //删除菜单接口
  const handleDeleteSumbit = async (id: string) => {
    await api.deleteMenu({
      id
    })
    let upData = [...data]
    console.log(id)
    console.log(upData)

    for (let i = 0; i < upData.length; i++) {
      if (upData[i].id === id) {
        upData.splice(i, 1)
      }
    }
    storage.set('menuList', upData)
    setData(upData)
    message.success('删除成功')
    getMenuList()
  }

  const columns: ColumnsType<Menu.MenuItem> = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName'
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      key: 'icon'
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render(menuType: number) {
        return {
          1: '菜单',
          2: '按钮',
          3: '页面'
        }[menuType]
      }
    },
    {
      title: '权限标识',
      dataIndex: 'menuCode',
      key: 'menuCode'
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: '组件名称',
      dataIndex: 'component',
      key: 'component'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render(record) {
        return (
          <Space>
            <Button type='text' onClick={() => handleSubCreate(record)}>
              新增
            </Button>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' danger onClick={() => handleDelete(record)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  return (
    <div>
      <Form className='search_form' layout='inline' form={form} initialValues={{ menuState: 1 }}>
        <Form.Item label='菜单名称' name='menuName'>
          <Input placeholder='用户名称' />
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState'>
          <Select style={{ width: 100 }}>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>停用</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type='primary' className='mr10' onClick={getMenuList}>
            搜索
          </Button>
          <Button type='default' onClick={handleReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <div className='base_table'>
        <div className='header_wrapper'>
          <div className='title'>菜单列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey='id' columns={columns} dataSource={data} pagination={false} />
      </div>
      <CreateMenu mRef={menuRef} update={getMenuList} />
    </div>
  )
}
