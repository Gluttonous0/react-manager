import { MutableRefObject } from 'react'
import { AnyObject, User } from './api'
export type IAction = 'create' | 'edit' | 'delete'

export type DataFromChild = string | number | object[]
export interface ImodalProp {
  mRef: MutableRefObject<{ open: (type: IAction, data: User.UserItem) => void } | undefined>
  update: () => void
  onDataReceived: (data: AnyObject[], num: number) => void
}
