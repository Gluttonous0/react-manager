import api from "@/api/orderApi";
import { Driver } from "@/types/api";
import { formateMobile } from "@/utils";
import { Button, Form, Input, Select, Space, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from "react";

export default function DriverList() {
  const [form] = useForm()
  const [driverList, setDriverList] = useState<Driver.DriverItem[]>()
  useEffect(() => {
    getDriverList()
  }, [])

  //获取司机列表
  const getDriverList = async () => {
    const data = await api.getDriverList(form.getFieldsValue())
    setDriverList(data.list)
  }

  //表格表头
  const columns: ColumnsType<Driver.DriverItem> = [
    {
      title: "司机名称",
      key: "driverName",
      dataIndex: "driverName",
      width: 100,
      fixed: 'left'
    },
    {
      title: "司机信息",
      key: "driverId",
      dataIndex: "driverId",
      width: 200,
      fixed: 'left',
      render(_, record) {
        return (
          <div>
            <p>司机ID:{record.driverId}</p>
            <p>手机号码:{formateMobile(record.driverPhone)}</p>
            <p>注册城市:{record.cityName}</p>
            <p>会员等级:{record.grade ? "会员" : "非会员"}</p>
            <p>司机等级:M{record.driverLevel}</p>
          </div>
        )
      }
    },
    {
      title: "司机状态",
      key: "accountStatus",
      dataIndex: "accountStatus",
      render(accountStatus: number) {
        if (accountStatus === 0) return "待认证"
        if (accountStatus === 1) return "正常"
        if (accountStatus === 2) return "暂时拉黑"
        if (accountStatus === 3) return "永久拉黑"
        if (accountStatus === 4) return "停止推送"
      }
    },
    {
      title: "车辆信息",
      key: "vehicleName",
      dataIndex: "vehicleName",
      width: 200,
      render(_, record) {
        return (
          <div>
            <p>车牌号码:{record.carNo}</p>
            <p>车辆品牌:{record.vehicleBrand}</p>
            <p>车辆名称:{record.vehicleName}</p>
          </div>
        )
      }
    },
    {
      title: "昨日在线时长",
      key: "onlineTime",
      dataIndex: "onlineTime",
      width: 120,
      render(_, record) {
        return record.onlineTime + "分钟"
      }
    },
    {
      title: "昨日司机流水",
      key: "driverAmount",
      dataIndex: "driverAmount",
      width: 120
    },
    {
      title: "司机评分",
      key: "rating",
      dataIndex: "rating"
    },
    {
      title: "行为分",
      key: "driverScore",
      dataIndex: "driverScore"
    },
    {
      title: "昨日推单数",
      key: "pushOrderCount",
      dataIndex: "pushOrderCount"
    },
    {
      title: "昨日完单数",
      key: "orderCompleteCount",
      dataIndex: "orderCompleteCount"
    },
    {
      title: "加入时间",
      key: "createTime",
      dataIndex: "createTime"
    },

  ]

  //模拟数据
  // const data = [
  //   {
  //     driverName: "小罗",// 司机名称
  //     driverId: 123,  // 司机ID
  //     driverPhone: "17677172453",// 司机手机号
  //     cityName: "南宁", // 城市名称
  //     grade: false,    // 会员等级
  //     driverLevel: 1,// 司机等级
  //     accountStatus: 0, // 司机状态
  //     carNo: "桂A88888",     // 车牌号
  //     vehicleBrand: "丰田",// 车辆品牌
  //     vehicleName: '卡罗拉', // 车辆名称
  //     onlineTime: 20, // 昨日在线时长
  //     driverAmount: 532,// 昨日司机流水
  //     rating: 10,   // 司机评分
  //     driverScore: 25, // 司机行为分
  //     pushOrderCount: 12,// 昨日推单数
  //     orderCompleteCount: 33,// 昨日完单数
  //     createTime: "2024年7月8日11:24:10", // 创建时间
  //   },
  //   {
  //     driverName: "小张",// 司机名称
  //     driverId: 1223,  // 司机ID
  //     driverPhone: "17677172453",// 司机手机号
  //     cityName: "南宁", // 城市名称
  //     grade: true,    // 会员等级
  //     driverLevel: 2,// 司机等级
  //     accountStatus: 1, // 司机状态
  //     carNo: "桂A88888",     // 车牌号
  //     vehicleBrand: "丰田",// 车辆品牌
  //     vehicleName: '卡罗拉', // 车辆名称
  //     onlineTime: 20, // 昨日在线时长
  //     driverAmount: 532,// 昨日司机流水
  //     rating: 10,   // 司机评分
  //     driverScore: 25, // 司机行为分
  //     pushOrderCount: 12,// 昨日推单数
  //     orderCompleteCount: 33,// 昨日完单数
  //     createTime: "2024年7月8日11:24:10", // 创建时间
  //   },
  //   {
  //     driverName: "小高",// 司机名称
  //     driverId: 1323,  // 司机ID
  //     driverPhone: "17677172453",// 司机手机号
  //     cityName: "南宁", // 城市名称
  //     grade: false,    // 会员等级
  //     driverLevel: 3,// 司机等级
  //     accountStatus: 2, // 司机状态
  //     carNo: "桂A88888",     // 车牌号
  //     vehicleBrand: "丰田",// 车辆品牌
  //     vehicleName: '卡罗拉', // 车辆名称
  //     onlineTime: 20, // 昨日在线时长
  //     driverAmount: 532,// 昨日司机流水
  //     rating: 10,   // 司机评分
  //     driverScore: 25, // 司机行为分
  //     pushOrderCount: 12,// 昨日推单数
  //     orderCompleteCount: 33,// 昨日完单数
  //     createTime: "2024年7月8日11:24:10", // 创建时间
  //   },
  //   {
  //     driverName: "小白",// 司机名称
  //     driverId: 1423,  // 司机ID
  //     driverPhone: "17677172453",// 司机手机号
  //     cityName: "南宁", // 城市名称
  //     grade: false,    // 会员等级
  //     driverLevel: 4,// 司机等级
  //     accountStatus: 3, // 司机状态
  //     carNo: "桂A88888",     // 车牌号
  //     vehicleBrand: "丰田",// 车辆品牌
  //     vehicleName: '卡罗拉', // 车辆名称
  //     onlineTime: 20, // 昨日在线时长
  //     driverAmount: 532,// 昨日司机流水
  //     rating: 10,   // 司机评分
  //     driverScore: 25, // 司机行为分
  //     pushOrderCount: 12,// 昨日推单数
  //     orderCompleteCount: 33,// 昨日完单数
  //     createTime: "2024年7月8日11:24:10", // 创建时间
  //   }
  // ]

  const handleSearch = () => {
    getDriverList()
  }

  const handleReset = () => {
    form.resetFields()
    getDriverList()
  }

  return (
    <div>
      <Form className='search_form' form={form} layout='inline'>
        <Form.Item label="司机名称" name="driverName">
          <Input placeholder="请输入司机名称" />
        </Form.Item>
        <Form.Item label="司机状态" name="accountStatus">
          <Select placeholder="请选择状态">
            <Select.Option value={0}>待认证</Select.Option>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>暂时拉黑</Select.Option>
            <Select.Option value={3}>永久拉黑</Select.Option>
            <Select.Option value={4}>停止推送</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" onClick={handleSearch}>搜索</Button>
            <Button type="default" onClick={handleReset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>
      <div className="base_table">
        <div className="header_wrapper">
          <div className="title">司机列表</div>
        </div>
        <Table
          bordered
          rowKey="driverId"
          columns={columns}
          scroll={{ x: 1300 }}
          dataSource={driverList}
        />
      </div>
    </div>
  )
}


