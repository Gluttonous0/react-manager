import { Button, Form, Input, Modal, Space, Table } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useRef, useState } from 'react'
import { Dept } from '@/types/api'
import api from '@/api/api'
import CreateDept from './CreateDept'
import { IAction } from '@/types/modal'
import { ColumnsType } from 'antd/es/table'
import { useDeptStore } from '@/store'
import storage from '@/utils/storage'
import { message, modal } from '@/utils/AntdGlobal'

export default function DeptList() {
  const [form] = useForm()
  const [data, setData] = useState<Dept.DeptItem[]>([])
  const deptRef = useRef<{
    open: (type: IAction, data?: Dept.EditParams | { parentId: string }) => void
  }>()

  // //设置临时储存zustand
  // const deptStore = useDeptStore(state => state.deptList)
  // const updateStore = useDeptStore(state => state.updateList)
  // const collapsed = useDeptStore(state => state.collapsed)
  // const updatecollapsed = useDeptStore(state => state.updateCollapsed)
  // console.log('data', data)
  // console.log('原始缓存', deptStore)

  //设置储存

  //列表初始化调用接口
  useEffect(() => {
    getDeptList()
  }, [])

  // useEffect(() => {
  //   setData(deptStore)
  // }, [data])
  // 这个函数会被子组件调用来传递数据
  // const handleDataFromChild = (datas: any, num: number) => {
  //   if (num === 0) {
  //     setTemporaryData(datas)
  //   }
  //   if (num === 1) {
  //     datas = datas[0]
  //     data.forEach((item, index) => {
  //       if (item.id === datas.id) {
  //         data[index] = { ...item, ...datas }
  //       }
  //     })
  //     setEditDeptData(data)
  //   }
  // }

  //自定义express接口返回部门数据
  // const getDeptList1 = async (searchData?: any) => {
  //   console.log(searchData)
  //   try {
  //     const data = await (await axios.get('http://localhost:5000/api/dept/list', { params: searchData })).data.data
  //     console.log('data:', data)
  //     // if (!data) {
  //     //   setData([])
  //     // }
  //     setData(data)
  //   } catch (error) {
  //     console.error('Error sending request:', error)
  //   }
  // }
  //调用apifox接口返回部门数据
  const getDeptList = async () => {
    const data = await api.getDeptList(form.getFieldsValue())
    // console.log(collapsed)
    // console.log('indexDeptStore', deptStore)
    if (storage.get('deptList')) {
      storage.set('deptList', storage.get('deptList'))
      setData(storage.get('deptList'))
      // updateStore(deptStore)
      // setData(deptStore)
      console.log('更新临时缓存')
    } else {
      storage.set('deptList', data)
      setData(data)
      // updateStore(data)
      // updatecollapsed()
      console.log('初始化列表')
    }

    // if (editDeptdata.length != 0) {
    //   setData(editDeptdata)
    // } else {
    //   setData([...data, ...temporarydata])
    // }
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

  //创建子级部门
  const handleSubCreate = (id: string) => {
    deptRef.current?.open('create', { parentId: id })
  }

  //编辑部门
  const handleEdit = (record: Dept.DeptItem) => {
    console.log(record)
    deptRef.current?.open('edit', record)
  }

  //删除部门
  const handleDelete = (id: string) => {
    modal.confirm({
      title: '确认',
      content: <span>确认删除该部门吗?</span>,
      onOk() {
        handleDeleteSumbit(id)
      }
    })
  }
  //删除部门接口
  const handleDeleteSumbit = async (id: string) => {
    await api.deleteDept({
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
    storage.set('deptList', upData)
    setData(upData)
    message.success('删除成功')
    getDeptList()
  }

  const columns: ColumnsType<Dept.DeptItem> = [
    {
      title: '部门ID',
      dataIndex: 'id',
      key: 'id',
      hidden: true
    },
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
            <Button type='text' onClick={() => handleSubCreate(record.id)}>
              新增
            </Button>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' danger onClick={() => handleDelete(record.id)}>
              删除
            </Button>
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
      <CreateDept
        mRef={deptRef}
        update={getDeptList}
        // onDataReceived={handleDataFromChild}
      />
    </div>
  )
}
