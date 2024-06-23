import request from '@/utils/request'
import { ResultData, Role } from '@/types/api'

export default {
  //获取角色列表
  getRoleList(params: Role.Parmas) {
    return request.get<ResultData<Role.RoleItem>>('/role/list', params)
  }
}
