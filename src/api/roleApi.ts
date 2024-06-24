import request from '@/utils/request'
import { ResultData, Role } from '@/types/api'

export default {
  //获取角色列表
  getRoleList(params: Role.Parmas) {
    return request.get<ResultData<Role.RoleItem>>('/role/list', params)
  },
  //创建角色
  createRole(params:Role.CreateParams){
    return request.post('/role/create',params)
  },
  //编辑角色
  editRole(params:Role.EditParams){
    return request.post('/role/edit',params)
  },
  //删除角色
  deleteRole(id:Role.DeleteParams){
    return request.post('/role/delete',id)
  }
}
