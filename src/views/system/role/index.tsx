import api from '@/api/roleApi'
import { Role, User } from '@/types/api'
import { useAntdTable } from 'ahooks'
import { useForm } from 'antd/es/form/Form'
import { Button, Table, Form, Input, Space } from 'antd'
import CreateRole from './CreateRole'
import { useRef } from 'react'
import { IAction } from '@/types/modal'
import { ColumnsType } from 'antd/es/table'
import { message, modal, } from '@/utils/AntdGlobal'
import SetPermission from './SetPermission'

export default function RoleList() {
  const [form] = useForm()
  const roleRef = useRef<{
    open:(type:IAction,data?:Role.RoleItem)=>void
  }>()
  const permissionRef = useRef<{
    open:(type:IAction,data?:Role.RoleItem)=>void
  }>()
  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: User.Params) => {
    return api
      .getRoleList({
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
    defaultPageSize: 10
  })

  // const list = [{
  //   id:'1',
  //   roleName:'啊收到',
  //   createTime:'2024年6月24日17:23:18',
  //   updateTime:'2024年6月24日17:23:18',
  //   remark:'dd',
  //   permissionList: {
  //     checkedKeys: ['2']
  //   }
  // }]

  const columns:ColumnsType<Role.RoleItem> = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime'
    },
    {
      title: '操作',
      key: 'action',
      render(record) {        
        return (
          <Space>
            <Button type='text' onClick={()=>handleEdit(record)}>编辑</Button>
            <Button type='text'onClick={()=>handlePermission(record)}>设置权限</Button>
            <Button type='text' danger onClick={()=>handleDelete(record.id)}>删除</Button>
          </Space>
        )
      }
    }
  ]
  //设置权限按钮
const handlePermission = (record:Role.RoleItem)=>{
  permissionRef.current?.open('edit',record)
}
  
  //新增按钮
  const handleCreate = ()=>{
    roleRef.current?.open('create')
  }

  //编辑按钮
  const handleEdit = (data:Role.RoleItem)=>{  
    roleRef.current?.open('edit',data)
  }

  //二次确认删除窗口
  const handleDelete =(id:Role.DeleteParams)=>{
    modal.confirm({
      title:"删除角色",
      content: '确认删除该角色吗?',
      okText: '确认',
      cancelText: '取消',
      onOk:()=>handleDeleteRole(id)
    })
  }
  //删除接口
  const handleDeleteRole = async(id:Role.DeleteParams)=>{
    await api.deleteRole(id)
    message.success('删除成功')
    search.submit()
  }
  return (
    <div className='role_wrap'>
      <Form className='search_form' form={form} layout='inline' initialValues={{ state: 0 }}>
        <Form.Item name='roleName' label='角色名称'>
          <Input placeholder='请输入角色名称' />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={search.submit}>
              搜索
            </Button>
            <Button type='default' onClick={search.reset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='base_table'>
        <div className='header_wrapper'>
          <div className='title'>角色列表</div>
          <div className='action'>
            <Space>
              <Button
                type='primary'
                onClick={handleCreate}
              >
                新增
              </Button>
              <Button
                type='primary'
                danger
                // onClick={handlePatchConfig}
              >
                批量删除
              </Button>
            </Space>
          </div>
        </div>
        <Table bordered rowKey='id' columns={columns} {...tableProps}/>;
      </div>
      <CreateRole mRef={roleRef} update={search.submit}/>
      <SetPermission mRef={permissionRef} update={search.submit}/>
    </div>
  )
}
