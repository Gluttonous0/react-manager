import request from '@/utils/request'
import { Logins } from '@/types/api'
export default {
  login(params: Logins.params) {
    return request.post('/users/login', params, { showLoading: false })
  }
}
