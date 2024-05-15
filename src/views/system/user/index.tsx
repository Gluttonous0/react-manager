import api from '@/api/api'
import { User } from '@/types/api'
import { formatDate } from '@/utils'
import { Button, Table, Form, Input, Select, Space } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'

export default function UserList() {
  const [data, setData] = useState<User.UserItem[]>([])
  useEffect(() => {
    getUserList()
  }, [])
  const getUserList = async () => {
    const data = await api.getUserList()
    console.log(data)

    setData(data.list)
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
      <Form className='search_form' layout='inline' initialValues={{ state: 0 }}>
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
            <Button type='primary'>搜索</Button>
            <Button type='default'>重置</Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='base_table'>
        <div className='header_wrapper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <Space>
              <Button type='primary'>新增</Button>
              <Button type='primary' danger>
                批量删除
              </Button>
            </Space>
          </div>
        </div>
        <Table bordered rowSelection={{ type: 'checkbox' }} dataSource={data} columns={columns} />;
      </div>
    </div>
  )
}
