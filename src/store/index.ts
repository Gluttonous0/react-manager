import resso from 'resso'
import { create } from 'zustand'
import { User } from '@/types/api'

const store = resso({
  token: '',
  userInfo: {
    userEmail: '',
    userName: ''
  }
})

export const useBearStore = create<{
  token: string
  userInfo: User.UserItem
  collapsed: boolean
  updateToken: (token: string) => void
  updateCollapsed: () => void
  updateUserInfo: (userInfo: User.UserItem) => void
}>(set => ({
  token: '',
  userInfo: {
    id: '',
    userId: 0,
    userName: '',
    userEmail: '',
    deptId: '',
    state: 0,
    role: 0,
    roleList: '',
    createId: 0,
    deptName: '',
    userImg: '',
    mobile: '',
    job: ''
  },
  collapsed: false,
  updateToken: token => set({ token }),
  updateCollapsed: () =>
    set(state => {
      return {
        collapsed: !state.collapsed
      }
    }),
  updateUserInfo: (userInfo: User.UserItem) =>
    set({
      userInfo
    })
}))

export default store
