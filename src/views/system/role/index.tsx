import api from '@/api/roleApi'
import { User } from '@/types/api'
import { useAntdTable } from 'ahooks'
import { useForm } from 'antd/es/form/Form'
import { Button, Table, Form, Input, Select, Space, Modal, message } from 'antd'
import CreateRole from './CreateRole'

export default function RoleList() {
  const [form] = useForm()
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

  const columns = [
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
      render() {
        return (
          <Space>
            <Button>编辑</Button>
            <Button>设置权限</Button>
            <Button danger>删除</Button>
          </Space>
        )
      }
    }
  ]

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
                // onClick={handleCreate}
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
        <Table bordered rowKey='userId' columns={columns} {...tableProps} />;
      </div>
      <CreateRole />
    </div>
  )
}
