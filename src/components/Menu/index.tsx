/**
 * 侧边栏设置
 */
import React from 'react'
import { Menu } from 'antd'
import { DesktopOutlined, SettingOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'
import type { MenuProps,MenuTheme } from 'antd/es/menu'
import { useEffect, useState } from 'react'
import { Menu as IMenu } from '@/types/api'
import * as Icons from '@ant-design/icons'


const SideMenu = () => {
  const data:any = useRouteLoaderData('layout')
  const [menuList,setMenuList] = useState<MenuItem[]>([])
  const [selectKeys,setSelectKeys] = useState<string[]>([])
  const navigate = useNavigate()
  const {pathname} = useLocation()
  type MenuItem = Required<MenuProps>['items'][number]

  //生成每个菜单项
  function getItem(label: React.ReactNode, key?: React.Key|null, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    label,
    key,
    icon,
    children
  } as MenuItem
  }
  
  //生成图标
  function addIcons (name?:string){
    if(!name) return <></>    
    const customerIcons:{[key:string]:any} = Icons
    const icon = customerIcons[name]
    if(!icon) return <></>
    return React.createElement(icon)
  }

  //递归函数生成菜单
  const getTreeMenu = (menuList:IMenu.MenuItem[],treeList:MenuItem[]=[])=>{
    menuList.forEach((item,index)=>{
      if(item.menuType === 1 &&item.menuState === 1){
        if(item.button){
          treeList.push(getItem(item.menuName,item.path||index,addIcons(item.icon)))
        } else{
          treeList.push(getItem(item.menuName,item.path||index,addIcons(item.icon),getTreeMenu(item.children||[])))
        }
        
      }
    })
    return treeList
  }

  //初始化获取菜单接口列表
  useEffect(()=>{
    const treeMenuList = getTreeMenu(data.menuList)
    setMenuList(treeMenuList)
    setSelectKeys([pathname])
  },[])

  // const items = [
  //   {
  //     label: '工作台',
  //     key: 1,
  //     icon: <DesktopOutlined />
  //   },
  //   {
  //     label: '系统管理',
  //     key: 2,
  //     icon: <SettingOutlined />,
  //     children: [
  //       {
  //         label: '用户管理',
  //         key: 3,
  //         icon: <DesktopOutlined />
  //       },
  //       {
  //         label: '部门管理',
  //         key: 4,
  //         icon: <DesktopOutlined />
  //       }
  //     ]
  //   }
  // ]
  
  const handleClickLogo = () => {
    navigate('/welcome')
  }

  //点击菜单事件
  const handleClickMenu= ({ key}:{key:string}) => {
    console.log(key);    
    setSelectKeys([key])
    navigate(key)
  }
  return (
    <div>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img src='/imgs/logo.png' alt='' />
        <span>猛男货运</span>
      </div>
      <Menu mode='inline' theme='dark' items={menuList} onClick={handleClickMenu} selectedKeys={selectKeys}/>
    </div>
  )
}
export default SideMenu
