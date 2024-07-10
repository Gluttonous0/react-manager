import resso from 'resso'
import { create } from 'zustand'
import { Dept, User } from '@/types/api'
import storage from '@/utils/storage'

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
  isDark: boolean
  updateToken: (token: string) => void
  updateCollapsed: () => void
  updateTheme: (isDark: boolean) => void
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
  isDark: storage.get('isDark') || false,
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
    }),
  updateTheme: (isDark: boolean) => set({ isDark })
}))

export const useDeptStore = create<{
  deptList: any[]
  updateList: (deptList: any[]) => void
  collapsed: boolean
  updateCollapsed: () => void
}>(set => ({
  deptList: [],
  collapsed: false,
  updateCollapsed: () => set(state => ({ collapsed: !state.collapsed })),
  updateList: (deptList: any[]) => set({ deptList })
}))

export default store
