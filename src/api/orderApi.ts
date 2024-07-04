import request from '@/utils/request'
import { ResultData, Order } from '@/types/api'

export default {
  //获取订单列表
  getOrderList(params: Order.Params) {
    return request.get<ResultData<Order.OrderItem>>('/order/list', params)
  },
  //获取城市列表
  getCityList() {
    return request.get<Order.DictItem[]>('/order/cityList')
  },
  //获取车型列表
  getVehicleList() {
    return request.get<Order.DictItem[]>('/order/vehicleList')
  },
  //创建订单 
  createOrder(params: Order.CreateParams) {
    return request.post('/order/create', params)
  },
  //获取订单详情
  getOrderDetail(orderId: string) {
    return request.get<Order.OrderItem>(`/order/detail?orderId=${orderId}`)
  }
}