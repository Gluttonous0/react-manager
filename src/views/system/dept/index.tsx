import { Button, Form, Input, Space, Table } from 'antd'
import { useForm } from 'antd/es/form/Form'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Dept } from '@/types/api'
import api from '@/api/api'
import CreateDept from './CreateDept'
import { IAction } from '@/types/modal'
import { ColumnsType } from 'antd/es/table'

export default function DeptList() {
  const [form] = useForm()
  const [data, setData] = useState<Dept.DeptItem[]>([])
  const deptRef = useRef<{
    open: (type: IAction, data?: Dept.EditParams | { parentId: string }) => void
  }>()
  //列表初始化调用接口
  useEffect(() => {
    getDeptList()
  }, [])

  //自定义express接口返回部门数据
  const getDeptList1 = async (searchData?: any) => {
    console.log(searchData)
    try {
      const data = await (await axios.get('http://localhost:5000/api/dept/list', { params: searchData })).data.data
      console.log('data:', data)
      // if (!data) {
      //   setData([])
      // }
      setData(data)
    } catch (error) {
      console.error('Error sending request:', error)
    }
  }
  //调用apifox接口返回部门数据
  const getDeptList = async () => {
    const data = await api.getDeptList(form.getFieldsValue())
    setData(data)
  }

  //重置按钮
  const handleReset = () => {
    form.resetFields()
    getDeptList()
  }

  //创建部门
  const handleCreate = () => {
    deptRef.current?.open('create')
  }

  //编辑部门
  const handleEdit = (record: Dept.DeptItem) => {
    deptRef.current?.open('edit', record)
  }

  const columns: ColumnsType<Dept.DeptItem> = [
    {
      title: '部门名称',
      dataIndex: 'deptName',
      key: 'deptName',
      width: 200
    },
    {
      title: '负责人',
      dataIndex: 'userName',
      key: 'userName',
      width: 150
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime'
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
            <Button type='text'>新增</Button>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text'>删除</Button>
          </Space>
        )
      }
    }
  ]
  return (
    <div>
      <Form className='search_form' layout='inline' form={form}>
        <Form.Item label='部门名称' name='deptName'>
          <Input placeholder='用户名称' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' className='mr10' onClick={getDeptList}>
            搜索
          </Button>
          <Button type='default' onClick={handleReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <div className='base_table'>
        <div className='header_wrapper'>
          <div className='title'>部门列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey='id' columns={columns} dataSource={data} pagination={false} />
      </div>
      <CreateDept mRef={deptRef} update={getDeptList} />
    </div>
  )
}
