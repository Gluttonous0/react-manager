import { MutableRefObject } from 'react'
import { AnyObject, User } from './api'
export type IAction = 'create' | 'edit' | 'delete'

export type DataFromChild = string | number | object[]
export interface ImodalProp<T = User.UserItem> {
  mRef: MutableRefObject<{ open: (type: IAction, data: T) => void } | undefined>
  update: () => void
  // onDataReceived: (data: AnyObject[], num: number) => void
}
