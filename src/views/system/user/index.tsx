import api from '@/api/api'
import { AnyObject, PageParams, User } from '@/types/api'
import { formatDate } from '@/utils'
import { Button, Table, Form, Input, Select, Space, Modal, message } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useEffect, useRef, useState } from 'react'
import CreateUser from './CreateUser'
import { IAction } from '@/types/modal'
import { useAntdTable } from 'ahooks'
import AuthButton from '@/components/AuthButton'

export default function UserList() {
  const [form] = Form.useForm()

  const [newAdmin, setNewAdmin] = useState<AnyObject[]>([])
  const [userIds, setUserIds] = useState<number[]>([])
  const [data, setData] = useState<AnyObject[]>([])
  // const [total, setTotal] = useState(0)
  // const [pagination, setPagination] = useState({
  //   current: 1,
  //   pageSize: 10
  // })
  const userRef = useRef<{
    open: (type: IAction, data?: User.UserItem) => void | undefined
  }>()
  const useAdminRef = useRef(newAdmin)
  // useEffect(() => {
  //   getUserList({
  //     pageNum: pagination.current,
  //     pageSize: pagination.pageSize
  //   })
  // }, [pagination.current, pagination.pageSize])
  // console.log(useAdminRef.current)

  //手动更新列表数据
  // useEffect(() => {
  //   useAdminRef.current = newAdmin
  //   setData(data => [...data, useAdminRef.current[0]])
  // }, [newAdmin])

  //ahooks
  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: User.Params) => {
    return api
      .getUserList({
        ...formData,
        pageNum: current,
        pageSize: pageSize
      })
      .then(data => {
        return {
          total: data.page.total,
          list: data.list
        }
      })
  }

  const { tableProps, search } = useAntdTable(getTableData, {
    form,
    defaultPageSize: 10,
  })


  const handleDataFromChild = (data: AnyObject[]) => {
    // 这个函数会被子组件调用来传递数据
    setNewAdmin(() => data)
  }

  //搜索
  const handleClick = (num: number) => {
    //搜索
    if (num === 1) {
      search.submit()
    }
    //重置表单
    if (num === 2) {
      search.reset()
      // getUserList({
      //   pageNum: 1,
      //   pageSize: pagination.pageSize
      // })
    }
  }

  //创建用户
  const handleCreate = () => {
    userRef.current?.open('create')
  }
  //编辑用户
  const handleEdit = (record: User.UserItem) => {
    userRef.current?.open('edit', record)
  }
  //删除用户（单个）
  const handleDel = (userId: number) => {
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该用户吗</span>,
      onOk: () => {
        handleUserDelSubmit([userId])
      }
    })
  }

  //批量删除确认
  const handlePatchConfig = () => {
    if (userIds.length === 0) {
      message.error('请选择要删除的用户')
    }
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该批用户吗</span>,
      onOk: () => {
        handleUserDelSubmit(userIds)
      }
    })
  }

  //公共删除用户接口
  const handleUserDelSubmit = async (ids: number[]) => {
    try {
      await api.delUser({ userIds: ids })
      message.success('删除成功')
      setUserIds([])
      search.reset()
    } catch (error) { }
  }

  const columns: ColumnsType<AnyObject> = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail'
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
      render(role: number) {
        return {
          0: '超级管理员',
          1: '管理员',
          2: '体验管理员',
          3: '普通用户'
        }[role]
      }
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render(state: number) {
        return {
          1: '在职',
          2: '离职',
          3: '试用期'
        }[state]
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      key: 'address',
      render(record: User.UserItem) {
        return (
          <Space>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' danger onClick={() => handleDel(record.userId)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  //传递子组件数据

  return (
    <div className='user_list'>
      <Form className='search_form' form={form} layout='inline' initialValues={{ state: 0 }}>
        <Form.Item name='userId' label='用户ID'>
          <Input placeholder='请输入用户ID' />
        </Form.Item>
        <Form.Item name='userName' label='用户名称'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item name='state' label='状态'>
          <Select style={{ width: 120 }}>
            <Select.Option value={0}>所有</Select.Option>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={() => handleClick(1)}>
              搜索
            </Button>
            <Button type='default' onClick={() => handleClick(2)}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='base_table'>
        <div className='header_wrapper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <Space>
              <Button type='primary' onClick={handleCreate}>
                新增
              </Button>
              <Button type='primary' danger onClick={handlePatchConfig}>
                批量删除
              </Button>
            </Space>
          </div>
        </div>
        <Table
          bordered
          rowKey='userId'
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: userIds,
            onChange: (selectedRowKeys: React.Key[]) => {
              setUserIds(selectedRowKeys as number[])
            }
          }}
          columns={columns}
          {...tableProps}
        />
        ;
      </div>
      <CreateUser
        mRef={userRef}
        update={() => {
          search.reset()
        }}
      // onDataReceived={handleDataFromChild}
      />
    </div>
  )
}
