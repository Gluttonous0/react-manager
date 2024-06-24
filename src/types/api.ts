/**
 * 接口类型定义
 * */
declare module 'axios' {
  interface AxiosRequestConfig {
    showLoading?: boolean
    showError?: boolean
  }
}

export interface Result<T = any> {
  code: number
  data: T
  msg: string
}

export interface ResultData<T = any> {
  list: T[]
  page: {
    pageNum: number
    pageSize: number
    total: number | 0
  }
}

export interface PageParams {
  pageNum: number
  pageSize: number
}

export namespace Logins {
  export interface params {
    userName: string
    userPwd: string
  }
}
export type AnyObject = Record<string, any>

export namespace User {
  export interface Params extends PageParams {
    userId?: number
    userName?: number
    state?: number
  }

  export interface UserItem {
    id: string
    userId: number
    userName: string
    userEmail: string
    deptId: string
    state: number
    role: number
    roleList: string
    createId: number
    deptName: string
    userImg: string
    mobile: string
    job: string
  }
  export interface UserNewItem extends UserItem {
    userName: string
    userEmail: string
    deptId: string
    state: number
    roleList: string
    mobile: string
    job: string
  }
  export interface CreateParams {
    userName: string
    userEmail: string
    deptId: string
    state: number
    roleList: string[]
    userImg: string
    mobile: string
    job: string
  }
  export interface EditParams extends CreateParams {
    userId: number
  }
}

export namespace Dept {
  export interface Params {
    deptName?: string
  }
  export interface DelParams {
    id: string
  }
  export interface DeptItem {
    id: string
    createTime: string
    updateTime: string
    deptName: string
    parentId: string
    userName: string
    children: DeptItem[]
  }
  export interface CreateParams {
    deptName: string
    parentId?: string
    userName: string
  }
  export interface EditParams extends CreateParams {
    id: string
  }
}

export namespace Menu {
  export interface Params {
    menuName: string
    menuState: number
  }
  export interface CreateParams {
    menuName: string
    icon?: string
    menuType: number
    menuState: number
    menuCode?: string
    parentId?: string
    path?: string
    component?: string
    orderBy: string
  }
  export interface MenuItem extends CreateParams {
    id: string
    createTime: string
    button?: MenuItem[]
    children?: MenuItem[]
  }
  export interface EditParams extends CreateParams {
    id: string
  }
  export interface DelParams {
    id: string
  }
}

export namespace Dashboard {
  export interface ReportData {
    driverCount: number
    totalMoney: number
    orderCount: number
    cityNum: number
  }
  export interface LineData {
    label: string[]
    order: number[]
    money: number[]
  }
  export interface PieData {
    value: number
    name: string
  }
  export interface RadarData {
    indicator: Array<{ name: string; max: number }>
    data: {
      name: string
      value: number[]
    }
  }
}

//角色列表
export namespace Role {
  export interface Parmas extends PageParams {
    roleName?: string
  }
  export interface CreateParams {
    roleName: string
    ramark?: string
  }
  export interface RoleItem extends CreateParams {
    id: string
    permissionList: {
      checkedKeys: string[]
    }
    updateTime: string
    createTime: string
  }
  export interface EditParams extends CreateParams{
    id:string,
  }
  export interface DeleteParams {
    id:string
  }
}
