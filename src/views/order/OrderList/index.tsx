import { useAntdTable } from "ahooks";
import { Form, Input, Select, Space, Button, Table } from "antd"
import { useForm } from "antd/es/form/Form"
import api from '@/api/orderApi'
import { Order } from "@/types/api";
import { ColumnsType } from "antd/es/table";
import { useRef } from "react";
import CreateOrder from "./components/CreateOrder";
import { formatMoney } from "@/utils";
import OrderDetail from "./components/OrderDetail";


export default function OrderList() {
  const [form] = useForm()
  const orderRef = useRef<{
    open: () => void
  }>()
  const detailRef = useRef<{
    open: (orderId: string) => void
  }>()
  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: Order.SearchParams) => {
    return api
      .getOrderList({
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
    defaultParams: [
      {
        current: 1,
        pageSize: 1,
      },
      {
        state: 1,
      }
    ]
  })

  const columns: ColumnsType<Order.OrderItem> = [
    {
      title: '订单编号',
      dataIndex: 'orderId',
      key: 'orderId'
    },
    {
      title: '城市',
      dataIndex: 'cityName',
      key: 'cityName',
      width: 80
    },
    {
      title: '下单地址',
      dataIndex: 'startAddress',
      key: 'startAddress',
      width: 120,
      render(_, record) {
        return (
          <div>
            <p>开始地址:{record.startAddress}</p>
            <p>结束地址:{record.endAddress}</p>
          </div>
        )
      }
    },
    {
      title: '订单金额',
      dataIndex: 'orderAmount',
      key: 'orderAmount',
      render(orderAmount) {
        return formatMoney(orderAmount)
      }
    },
    {
      title: '订单状态',
      dataIndex: 'state',
      key: 'state',
      render(state) {
        if (state === 1) {
          return "进行中"
        }
        if (state === 2) {
          return "已完成"
        }
        if (state === 3) {
          return "超时"
        }
        if (state === 4) {
          return "取消"
        }
      }
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '司机名称',
      dataIndex: 'driverName',
      key: 'driverName'
    },
    {
      title: '操作',
      key: 'action',
      render(record) {
        return (
          <Space>
            <Button type="text" onClick={() => handleDetail(record.orderId)}>详情</Button>
            <Button type="text">打点</Button>
            <Button type="text">轨迹</Button>
            <Button type="text" danger>删除</Button>
          </Space>
        )
      }
    },
  ]

  //订单详情
  const handleDetail = (orderId: string) => {
    console.log(orderId);
    detailRef.current?.open(orderId)
  }

  //创建订单
  const handleCreate = () => {
    orderRef.current?.open()
  }
  return (
    <div className="orderList">
      <Form className='search_form' form={form} layout='inline' >
        <Form.Item name='orderId' label='订单ID'>
          <Input placeholder='请输入订单ID' />
        </Form.Item>
        <Form.Item name='userName' label='用户名称'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item name='state' label='状态'>
          <Select style={{ width: 120 }}>
            <Select.Option value={1}>进行中</Select.Option>
            <Select.Option value={2}>已完成</Select.Option>
            <Select.Option value={3}>超时</Select.Option>
            <Select.Option value={4}>取消</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' >
              搜索
            </Button>
            <Button type='default' >
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

            </Space>
          </div>
        </div>
        <Table
          bordered
          rowKey='orderId'
          columns={columns}
          {...tableProps}
        />
        ;
      </div>
      <CreateOrder mRef={orderRef} update={search.submit} />
      <OrderDetail mRef={detailRef} />
    </div>
  )
}