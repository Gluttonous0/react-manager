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
      halfCheckedKeys: string[]
    }
    updateTime: string
    createTime: string
  }
  export interface EditParams extends CreateParams {
    id: string
  }
  export interface DeleteParams {
    id: string
  }
  export interface Permission {
    id: string
    permissionList: {
      checkedKeys: string[]
      halfCheckedKeys: string[]
    }
  }
}

export namespace Order {
  export enum IState {
    doing = 1,
    done = 2,
    timeout = 3,
    cance = 4
  }
  export interface CreateParams {
    cityName: string
    userName: string
    mobile: number
    startAddress: string //下单开始地址
    endAddress: string //下单结束地址
    orderAmount: number //订单金额
    userPayAomunt: number //支付金额
    driverAmount: number //支付金额
    payType: number //支付方式  1:微信  2:支付宝
    driverName: string //司机名称
    vehicleName: string //订单车型
    state: IState //订单状态   1:进行中  2:已完成  3:超时  4:取消
    useTime: string //用车时间
    endTime: string //订单结束时间
  }
  export interface OrderItem extends CreateParams {
    id: string
    orderId: string //订单ID
    route: Array<{ lng: string; lat: string }> //行事轨迹
    craeteTime: string //创建时间
    remark: string //备注
  }

  export interface SearchParams {
    orderId?: string //订单编号
    userName?: string //用户名称
    state?: IState //订单状态   1:进行中  2:已完成  3:超时  4:取消
  }
  export interface Params extends PageParams {
    orderId?: string //订单编号
    userName?: string //用户名称
    state?: IState //订单状态   1:进行中  2:已完成  3:超时  4:取消
  }
  export interface DictItem {
    id: string
    name: string
  }
  export interface OrderRoute {
    orderId: string
    route: Array<{ lng: string; lat: string }>
  }
}

export namespace Driver {
  export enum DriverStatus {
    auth = 0,// 待认证
    normal = 1,//正常
    temp = 2,// 暂时拉黑
    always = 3,// 永久拉黑
    stop = 4 //停止推送
  }
  export interface DriverItem {
    driverName: string // 司机名称
    driverId: number   // 司机ID
    driverPhone: string// 司机手机号
    cityName: string   // 城市名称
    grade: boolean     // 会员等级
    driverLevel: number// 司机等级
    accountStatus: DriverStatus // 司机状态
    carNo: string      // 车牌号
    vehicleBrand: string // 车辆品牌
    vehicleName: string  // 车辆名称
    onlineTime: number   // 昨日在线时长
    driverAmount: number // 昨日司机流水
    rating: number       // 司机评分
    driverScore: number  // 司机行为分
    pushOrderCount: number// 昨日推单数
    orderCompleteCount: number// 昨日完单数
    createTime: string   // 创建时间
  }
  export interface SearchParams {
    driverName?: string;
    accountStatus?: number
  }
}
