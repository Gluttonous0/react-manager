import { ImodalProp } from "@/types/modal";
import { Modal } from "antd";
import { useImperativeHandle, useState } from "react";

export default function CreateOrder(props: ImodalProp) {
  const [visible, setVisible] = useState(false)

  //弹窗暴露
  useImperativeHandle(props.mRef, () => {
    return { open }
  })
  const open = () => {
    setVisible(true)
  }

  //关闭弹窗
  const handleCancel = () => {
    setVisible(false)
  }

  //提交订单
  const handleOk = () => { }
  return (
    <Modal title='创建订单'
      open={visible}
      width={800}
      okText='提交'
      cancelText='取消'
      onOk={handleOk}
      onCancel={handleCancel}>

    </Modal>
  )
}