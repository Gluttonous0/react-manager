import { IDetailProp } from '@/types/modal'
import { Modal } from 'antd'
import { useImperativeHandle, useState } from 'react'
import api from '@/api/orderApi'
import { Order } from '@/types/api'
import { message } from '@/utils/AntdGlobal'

export default function OrderMarker(props: IDetailProp) {
  const [visible, setVisible] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [markers, setMarkers] = useState<{ lng: string; lat: string; id: number }[]>([])
  console.log(markers)

  useImperativeHandle(props.mRef, () => {
    return { open }
  })
  //打开弹框
  const open = async (orderId: string) => {
    setOrderId(orderId)
    setVisible(true)
    const detail = await api.getOrderDetail(orderId)
    renderMap(detail)
  }

  //渲染地图
  const renderMap = (detail: Order.OrderItem) => {
    const map = new window.BMapGL.Map('markerMap')
    map.centerAndZoom(detail.cityName, 12)
    const scaleCtrl = new window.BMapGL.ScaleControl() // 添加比例尺控件
    map.addControl(scaleCtrl)
    const zoomCtrl = new window.BMapGL.ZoomControl() // 添加缩放控件
    map.enableScrollWheelZoom(true) //鼠标缩放
    map.addControl(zoomCtrl)
    //初始化打点值
    detail.route?.map(item => {
      createMarker(map, item.lng, item.lat)
    })

    //绑定事件
    map.addEventListener('click', function (e: any) {
      createMarker(map, e.latlng.lng, e.latlng.lat)
    })
  }

  //创建marker(打点)
  const createMarker = (map: any, lng: string, lat: string) => {
    const marker = new window.BMapGL.Marker(new window.BMapGL.Point(lng, lat))
    const id = Math.random()
    markers.push({ lng, lat, id })
    marker.id = id

    const markerMenu = new window.BMapGL.ContextMenu()
    markerMenu.addItem(
      new window.BMapGL.MenuItem('删除', function () {
        map.removeOverlay(marker)
        const index = markers.findIndex(item => item.id === marker.id)
        markers.splice(index, 1)
        setMarkers([...markers])
      })
    )
    setMarkers([...markers])
    marker.addContextMenu(markerMenu)
    map.addOverlay(marker)
  }

  //更新打点
  const handleOk = async () => {
    await api.updateOrderInfo({
      orderId,
      route: markers
    })
    message.success('打点成功')
    handleCancel()
  }

  //取消按钮
  const handleCancel = () => {
    setVisible(false)
    setMarkers([])
  }
  return (
    <Modal
      title='地图打点'
      width={1100}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div id='markerMap' style={{ height: 500 }}></div>
    </Modal>
  )
}
