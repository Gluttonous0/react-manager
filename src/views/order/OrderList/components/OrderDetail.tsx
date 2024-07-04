import api from "@/api/orderApi";
import { Order } from "@/types/api";
import { IDetailProp } from "@/types/modal";
import { formatMoney, formateMobile } from "@/utils";
import { Descriptions, Modal } from "antd";
import { useImperativeHandle, useState } from "react";

export default function OrderDetail(props: IDetailProp) {
  const [visible, setVisible] = useState(false)
  const [detail, setDetail] = useState<Order.OrderItem>()

  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  const open = async (orderId: string) => {
    const data = await api.getOrderDetail(orderId)
    setVisible(true)
    setDetail(data)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const handleState = (num: any) => {
    if (!num) return ""
    if (num === 1) return "进行中"
    if (num === 2) return "已完成"
    if (num === 3) return "超时"
    if (num === 4) return "取消"
  }
  return <Modal
    title='订单详情'
    open={visible}
    width={800}
    footer={false}
    onCancel={handleCancel}
  >
    <Descriptions column={2} style={{ padding: '10px 30px' }}>
      <Descriptions.Item label="订单编号">{detail?.orderId}</Descriptions.Item>
      <Descriptions.Item label="下单城市">{detail?.cityName}</Descriptions.Item>
      <Descriptions.Item label="下单用户">{detail?.userName}</Descriptions.Item>
      <Descriptions.Item label="手机号">{formateMobile(detail?.mobile)}</Descriptions.Item>
      <Descriptions.Item label="起点">{detail?.startAddress}</Descriptions.Item>
      <Descriptions.Item label="终点">{detail?.endAddress}</Descriptions.Item>
      <Descriptions.Item label="订单金额">{formatMoney(detail?.orderAmount)}</Descriptions.Item>
      <Descriptions.Item label="用户支付金额">{formatMoney(detail?.userPayAomunt)}</Descriptions.Item>
      <Descriptions.Item label="司机到账金额">{formatMoney(detail?.driverAmount)}</Descriptions.Item>
      <Descriptions.Item label="支付方式">{detail?.payType == 1 ? "微信" : "支付宝"}</Descriptions.Item>
      <Descriptions.Item label="司机名称">{detail?.driverName}</Descriptions.Item>
      <Descriptions.Item label="订单车型">{detail?.vehicleName}</Descriptions.Item>
      <Descriptions.Item label="订单状态" >{handleState(detail?.state)}</Descriptions.Item>
      <Descriptions.Item label="用车时间">{detail?.useTime}</Descriptions.Item>
      <Descriptions.Item label="订单结束时间">{detail?.endTime}</Descriptions.Item>
      <Descriptions.Item label="订单创建时间">{detail?.craeteTime}</Descriptions.Item>
    </Descriptions>
  </Modal>
}