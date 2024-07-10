import { ImodalProp } from '@/types/modal'
import { Col, DatePicker, Input, Modal, Row, Select } from 'antd'
import { useEffect, useImperativeHandle, useState } from 'react'
import moment from 'moment'
import 'moment/locale/zh-cn'
import api from '@/api/orderApi'
import { Order } from '@/types/api'
import { message } from '@/utils/AntdGlobal'
import FormRender, { useForm } from 'form-render'
moment.locale('zh-cn')

export default function CreateOrder(props: ImodalProp) {
  const [visible, setVisible] = useState(false)
  const form = useForm()

  //获取车型,城市下拉列表
  const getInitData = async () => {
    const cityData = await api.getCityList()
    const vehicleData = await api.getVehicleList()
    form.setSchema({
      cityName: {
        props: {
          options: cityData.map(item => ({ label: item.name, value: item.id }))
        }
      },
      vehicleName: {
        props: {
          options: vehicleData.map(item => ({ label: item.name, value: item.id }))
        }
      },
      state: {
        props: {
          options: [
            { label: "进行中", value: 1 },
            { label: "已完成", value: 2 },
            { label: "超时", value: 3 },
            { label: "取消", value: 4 },
          ]
        }
      },
      payType: {
        props: {
          options: [
            { label: "微信", value: 1 },
            { label: "支付宝", value: 2 },
          ]
        }
      }
    })
  }

  //弹窗暴露
  useImperativeHandle(props.mRef, () => {
    return { open }
  })
  //打开弹窗
  const open = () => {
    setVisible(true)
  }

  //关闭弹窗
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }

  //提交订单
  const handleOk = async () => {
    const valid = await form.validateFields()
    if (valid) {
      api.createOrder(form.getValues())
      message.success('操作成功')
      handleCancel()
      props.update()
    }
  }

  const schema = {
    type: 'object',
    displayType: 'row',
    column: 2,
    labelWidth: 120,
    properties: {
      cityName: {
        title: "城市名称",
        type: 'string',
        widget: "select",
        placeholder: '请选择城市',
        rules: [{ required: true, message: '请选择城市' }],
      },
      vehicleName: {
        title: "车型名称",
        type: 'string',
        widget: "select",
        placeholder: '请选择车型',
        rules: [{ required: true, message: '请选择车型' }],
      },
      userName: {
        title: "用户名称",
        type: 'string',
        widget: "input",
        placeholder: '请输入用户名称',
        rules: [{ required: true, message: '请输入用户名称' }],
      },
      mobile: {
        title: "手机号码",
        type: 'string',
        widget: "input",
        placeholder: '请输入手机号码',
      },
      startAddress: {
        title: "起始地址",
        type: 'string',
        widget: "input",
        placeholder: '请输入起始地址',
      },
      endAddress: {
        title: "结束地址",
        type: 'string',
        widget: "input",
        placeholder: '请输入结束地址',
      },
      orderAmount: {
        title: "下单金额",
        type: 'number',
        widget: "inputNumber",
        placeholder: '请输入下单金额',
      },
      userPayAomunt: {
        title: "支付金额",
        type: 'number',
        widget: "inputNumber",
        placeholder: '请输入支付金额',
      },
      driverName: {
        title: "司机名称",
        type: 'string',
        widget: "input",
        placeholder: '请输入司机名称',
      },
      driverAmount: {
        title: "司机金额",
        type: 'number',
        widget: "inputNumber",
        placeholder: '请输入司机金额',
      },
      payType: {
        title: "支付方式",
        type: 'number',
        widget: "select",
        placeholder: '请选择支付方式',
      },
      state: {
        title: "订单状态",
        type: 'number',
        widget: "select",
        placeholder: '请选择订单状态',
      },
      useTime: {
        title: "用车时间",
        type: 'string',
        widget: "datePicker",
        placeholder: '请选择日期',
      },
      endTime: {
        title: "结束时间",
        type: 'string',
        widget: "datePicker",
        placeholder: '请选择日期',
      },
    }
  }

  return (
    <Modal
      title='创建订单'
      open={visible}
      width={800}
      okText='提交'
      cancelText='取消'
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <FormRender schema={schema} form={form} onMount={getInitData}></FormRender>
    </Modal>
  )
}
