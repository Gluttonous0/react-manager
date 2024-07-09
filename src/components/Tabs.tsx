import { IAuthLoader } from '@/router/AuthLoader'
import { searchRoute } from '@/utils'
import { Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'

interface TabsItem {
  key: string
  label: string
  closable: boolean
}
export default function TabsFC() {
  const { pathname } = useLocation()
  const [tabsList, setTabsList] = useState<TabsItem[]>([{ key: '/welcome', label: '首页', closable: false }])
  const [activeKey, setActiveKey] = useState('')
  const data = useRouteLoaderData('layout') as IAuthLoader
  const navigate = useNavigate()
  console.log('tabsList,', tabsList)

  useEffect(() => {
    addTabs()
  }, [pathname])

  const addTabs = () => {
    const route = searchRoute(pathname, data.menuList)
    if (route.length != '') {
      if (!tabsList.find(item => item.label == route.menuName)) {
        tabsList.push({
          key: route.path,
          label: route.menuName,
          closable: pathname !== '/welcome'
        })
      }
      setActiveKey(pathname)
      setTabsList([...tabsList])
    }
  }

  //删除面包屑
  const onEdit = (targetKey: any) => {
    const newTabsList = [...tabsList]

    // debugger
    if (pathname === targetKey) {
      newTabsList.forEach((item, index) => {
        if (item.key != pathname) return
        const nextTabs = newTabsList[index + 1] || newTabsList[index - 1]
        if (!nextTabs) return
        navigate(nextTabs.key)
        setActiveKey(nextTabs.key)
      })
    }
    // const itemIndex = newTabsList.findIndex(item => item.key === targetKey)
    // newTabsList.splice(itemIndex, 1)
    setTabsList(newTabsList.filter(item => item.key != targetKey))

    console.log(newTabsList)
  }

  //改变面包屑页签
  const handleChange = (e: string) => {
    setActiveKey(e)
    navigate(e)
  }
  return (
    <Tabs
      activeKey={activeKey}
      items={tabsList}
      tabBarStyle={{ height: 40, marginBottom: 0, backgroundColor: '#fff' }}
      type='editable-card'
      hideAdd
      onEdit={onEdit}
      onChange={handleChange}
    />
  )
}
