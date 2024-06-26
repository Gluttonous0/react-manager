/**
 * 工具函数封装
 */

import { Menu } from '@/types/api'

//格式化金额
export const formatMoney = (num?: Number | string) => {
  if (!num) {
    return 0
  }
  const a = parseFloat(num.toString())
  // console.log(a)
  // console.log(typeof num)
  return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
}

//格式化数字，正则表达式
export const formatNum = (num?: Number | string) => {
  if (!num) {
    return 0
  }
  const a = num.toString()
  if (a.indexOf('.') > -1) {
    const exp = /(\d)(?=(\d{3})+\.)/g
    return a.replace(exp, '$1,')
  } else {
    const exp = /(\d)(?=(\d{3})+$)/g
    return a.replace(exp, '$1,')
  }
}

//格式化日期
export const toLocalDate = (date?: Date, rule?: string) => {
  let curDate = new Date()
  if (date) curDate = date
  if (rule === 'yyyy-MM-dd') return curDate.toLocaleDateString()
  if (rule === 'HH:mm:ss') return curDate.toLocaleTimeString()
  return curDate.toLocaleString()
}
//格式化日期，正则表达式
export const formatDate = (date?: Date | string, rule?: string) => {
  let curDate = new Date()
  if (date instanceof Date) {
    curDate = date
  } else if (date) {
    curDate = new Date(date)
  }

  let fmt = rule || 'yyyy-MM-dd HH:mm:ss'
  fmt = fmt.replace(/(y+)/, curDate.getFullYear().toString())

  type OTyle = {
    [key: string]: number
  }
  const O: OTyle = {
    'M+': curDate.getMonth() + 1,
    'd+': curDate.getDate(),
    'H+': curDate.getHours(),
    'm+': curDate.getMinutes(),
    's+': curDate.getSeconds()
  }
  for (const k in O) {
    const isLength = O[k].toString().length < 2
    fmt = fmt.replace(new RegExp(`${k}`), isLength ? `0${O[k].toString()}` : O[k].toString())
  }
  return fmt
}

//用户状态转换
export const formatState = (state: number) => {
  if (state === 1) {
    return '在职'
  } else if (state === 2) {
    return '离职'
  } else {
    return ''
  }
}

export const getMenuPath = (list: Menu.MenuItem[]): string[] => {
  return list.reduce((result: string[], item: Menu.MenuItem) => {
    return result.concat(Array.isArray(item.children) && !item.button ? getMenuPath(item.children) : item.path + '')
  }, [])
}
