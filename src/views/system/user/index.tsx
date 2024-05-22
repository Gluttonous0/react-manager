import api from '@/api/api'
import { PageParams, User } from '@/types/api'
import { formatDate } from '@/utils'
import { Button, Table, Form, Input, Select, Space } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useEffect, useRef, useState } from 'react'
import CreateUser from './CreateUser'
import { IAction } from '@/types/modal'

export default function UserList() {
  const [form] = Form.useForm()
  const [data, setData] = useState<User.UserItem[]>([])
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  })
  const userRef = useRef<{
    open: (type: IAction, data?: User.UserItem) => void | undefined
  }>()

  useEffect(() => {
    console.log(pagination)
    getUserList({
      pageNum: pagination.current,
      pageSize: pagination.pageSize
    })
  }, [pagination.current, pagination.pageSize])

  //获取用户列表
  const getUserList = async (params: PageParams) => {
    const values = form.getFieldsValue()
    const data = await api.getUserList({
      ...values,
      pageNum: params.pageNum,
      pageSize: params.pageSize
    })
    const list = Array.from({ length: 51 })
      .fill({})
      .map((item: any) => {
        ;(item = { ...data.list[0] }), (item.userId = Math.random())
        return item
      })
    setData(list)
    setTotal(list.length)
    // setPagination({
    //   current: data.page.pageNum,
    //   pageSize: data.page.pageSize
    // })
  }

  //搜索
  const handleClick = (num: number) => {
    //搜索
    if (num === 1) {
      getUserList({
        pageNum: 1,
        pageSize: pagination.pageSize
      })
    }
    //重置表单
    if (num === 2) {
      form.resetFields()
      getUserList({
        pageNum: 1,
        pageSize: pagination.pageSize
      })
    }
  }
  // {
  //   key: '1',
  //   name: '胡彦斌',
  //   age: 32,
  //   address: '西湖区湖底公园1号'
  // },
  // {
  //   key: '2',
  //   name: '胡彦祖',
  //   age: 42,
  //   address: '西湖区湖底公园1号'
  // }
  const handleCreate = () => {
    userRef.current?.open('create')
  }

  const columns: ColumnsType<User.UserItem> = [
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
      dataIndex: 'address',
      key: 'address',
      render() {
        return (
          <Space>
            <Button type='text'>编辑</Button>
            <Button type='text' danger>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]
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
              <Button type='primary' danger>
                批量删除
              </Button>
            </Space>
          </div>
        </div>
        <Table
          bordered
          rowKey='userId'
          rowSelection={{ type: 'checkbox' }}
          dataSource={data}
          columns={columns}
          pagination={{
            position: ['bottomRight'],
            current: pagination.current,
            pageSize: pagination.pageSize,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: function (totle) {
              return `总共${totle}条`
            },
            onChange: (page, pageSize) => {
              setPagination({
                current: page,
                pageSize
              })
            }
          }}
        />
        ;
      </div>
      <CreateUser
        mRef={userRef}
        update={() => {
          getUserList({
            pageNum: 1,
            pageSize: pagination.pageSize
          })
        }}
      />
    </div>
  )
}
