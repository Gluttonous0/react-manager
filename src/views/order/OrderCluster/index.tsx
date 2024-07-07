import api from '@/api/orderApi'
import { Select } from 'antd'
import { useEffect, useState } from 'react'

export default function OrderCluster() {
  const [cityId, setCityId] = useState(10000)
  useEffect(() => {
    getCityData(cityId)
  }, [cityId])
  const getCityData = async (cityId: number) => {
    const data = await api.getCityData(cityId)
    setTimeout(() => {
      renderMap(data)
    })
  }
  const renderMap = (data: Array<{ lng: string; lat: string }>) => {
    const map = new window.BMapGL.Map('clusterMap')
    const zoomCtrl = new window.BMapGL.ZoomControl()
    map.enableScrollWheelZoom(true)
    map.addControl(zoomCtrl)
    const cityNames: { [k: number]: string } = {
      10000: '南宁',
      10001: '北京',
      10002: '广州',
      10003: '上海',
      10004: '南京'
    }
    map.centerAndZoom(cityNames[cityId], 12)

    const markers = []
    for (let i = 0; i < data.length; i++) {
      // const { lng, lat } = data[i]
      // const point = new window.BMapGL.Point(lng, lat)
      // markers.push(new window.BMapGL.Marker(point))
      markers.push(new window.BMapGL.Marker(new window.BMapGL.Point(data[i].lng, data[i].lat)))
    }
    if (markers.length > 0) {
      new window.BMapLib.MarkerClusterer(map, { markers: markers })
    }
  }

  //修改选项
  const handleChange = (e: any) => {
    setCityId(e)
  }

  return (
    <div style={{ backgroundColor: '#fff', padding: 10, borderRadius: 5 }}>
      <Select style={{ width: 100, marginBottom: 10 }} value={cityId} onChange={handleChange}>
        <Select.Option value={10000}>南宁</Select.Option>
        <Select.Option value={10001}>北京</Select.Option>
        <Select.Option value={10002}>广州</Select.Option>
        <Select.Option value={10003}>上海</Select.Option>
        <Select.Option value={10004}>南京</Select.Option>
      </Select>
      <div id='clusterMap' style={{ height: 'calc(100vh - 212px)' }}></div>
    </div>
  )
}
