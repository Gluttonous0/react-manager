/**
 * 主页页面
 */

import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Watermark } from 'antd'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NvaFooter'
import SideMenu from '@/components/Menu'
import { Outlet, useRouteLoaderData } from 'react-router-dom'
import styles from './index.module.less'
import { useEffect } from 'react'
import api from '@/api/api'
import store, { useBearStore } from '@/store'
const { Content, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [getItem('Tom', '3'), getItem('Bill', '4'), getItem('Alex', '5')]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />)
]

const App: React.FC = () => {
  const updateUserInfo = useBearStore(state => state.updateUserInfo)
  useEffect(() => {
    getUserInfo()
  }, [])
  const getUserInfo = async () => {
    const data = await api.getUserInfo()
    console.log(data)
    updateUserInfo(data)
  }

  const data = useRouteLoaderData('layout')
  console.log('data,', data)
  return (
    <Watermark content='React'>
      <Layout>
        {/* 侧边栏 */}
        <Sider>
          <SideMenu />
        </Sider>

        <Layout>
          {/* 顶部导航栏 */}
          <NavHeader />
          <Content className={styles.content}>
            <div className={styles.wapper}>
              <Outlet></Outlet>
            </div>
            <NavFooter />
          </Content>
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default App
