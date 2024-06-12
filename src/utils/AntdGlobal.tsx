// 组件设置包裹避免报错的文件
import { App } from 'antd'
import type { MessageInstance } from 'antd/es/message/interface'
import type { ModalStaticFunctions } from 'antd/es/modal/confirm'
import type { NotificationInstance } from 'antd/es/notification/interface'

let message: MessageInstance
let notification: NotificationInstance
let modal: Omit<ModalStaticFunctions, 'warn'>

export default () => {
  const staticFunction = App.useApp()
  message = staticFunction.message
  modal = staticFunction.modal
  notification = staticFunction.notification
  return null
}

export { message, notification, modal }

// import { App } from 'antd'; 
// import type { MessageInstance } from 'antd/es/message/interface'; 
// import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
//  import type { NotificationInstance } from 'antd/es/notification/interface';
//   let message: MessageInstance; let notification: NotificationInstance; 
//   let modal: Omit<ModalStaticFunctions, 'warn'>; 
//   const AntdGlobal = () => { const staticFunction = App.useApp(); 
//     message = staticFunction.message; modal = staticFunction.modal; 
//     notification = staticFunction.notification; return null; }; 
//     export default AntdGlobal; export { message, notification, modal };
