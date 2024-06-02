import request from '@/utils/request'
import { Dashboard, Logins, ResultData, User, AnyObject, Dept } from '@/types/api'

export default {
  //登录
  login(params: Logins.params) {
    return request.post('/users/login', params, { showLoading: false })
  },
  //获取用户信息
  getUserInfo() {
    return request.get<User.UserItem>('/users/getUserInfo')
  },
  //获取工作台汇总数据
  getReportData() {
    return request.get<Dashboard.ReportData>('/order/dashboard/getReportData')
  },
  //获取折线图数据
  getLineData() {
    return request.get<Dashboard.LineData>('/order/dashboard/getLineData')
  },
  //获取饼图图数据(城市)
  getPieCityData() {
    return request.get<Dashboard.PieData[]>('/order/dashboard/getPieCityData')
  },
  //获取饼图图数据(年龄)
  getPieAgeData() {
    return request.get<Dashboard.PieData[]>('/order/dashboard/getPieAgeData')
  },
  //获取六角图数据
  getRadarData() {
    return request.get<Dashboard.RadarData>('/order/dashboard/getRadarData')
  },
  //获取用户列表
  getUserList(params: User.Params) {
    return request.get<ResultData<AnyObject>>('/users/list', params)
  },
  //创建用户
  createUser(params: User.CreateParams) {
    return request.post('/users/create', params)
  },
  //编辑用户
  editUser(params: User.CreateParams) {
    return request.post('/users/edit', params)
  },
  //删除用户
  delUser(params: { userIds: number[] }) {
    return request.post('/users/delete', params)
  },
  //部门管理
  //部门列表
  getDeptList(params: Dept.Params) {
    return request.get<Dept.DeptItem[]>('/dept/list', params)
  }
}
