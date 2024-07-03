import request from '@/utils/request'
import { ResultData, Order } from '@/types/api'

export default {
  //获取订单列表
  getOrderList(params: Order.Params) {
    return request.get<ResultData<Order.OrderItem>>('/order/list', params)
  }
}