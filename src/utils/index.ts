/**
 * 工具函数封装
 */

//格式化金额
export const formatMoney = (num: Number | string) => {
  const a = parseFloat(num.toString())
  // console.log(a)
  // console.log(typeof num)
  return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
}

//格式化数字，正则表达式
export const formatNum = (num: Number | string) => {
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
export const toLocalDateExp = (date?: Date, rule?: string) => {
  let curDate = new Date()
  if (date) curDate = date

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
