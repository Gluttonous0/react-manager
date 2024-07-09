/**
 * 主页页面
 */

// import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
// import type { MenuProps } from 'antd'
import { Layout, Watermark } from 'antd'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NvaFooter'
import SideMenu from '@/components/Menu'
import { Navigate, Outlet, useLocation, useRouteLoaderData } from 'react-router-dom'
import styles from './index.module.less'
import { useEffect } from 'react'
import api from '@/api/api'
import { useBearStore } from '@/store'
import { IAuthLoader } from '@/router/AuthLoader'
import { router } from '@/router/index'
import { searchRoute } from '@/utils'
import TabsFC from '@/components/Tabs'
const { Content, Sider } = Layout

const App: React.FC = () => {
  const updateUserInfo = useBearStore(state => state.updateUserInfo)
  const { pathname } = useLocation()
  useEffect(() => {
    getUserInfo()
  }, [])
  const getUserInfo = async () => {
    const data = await api.getUserInfo()
    updateUserInfo(data)
  }
  const route = searchRoute(pathname, router)
  const data = useRouteLoaderData('layout') as IAuthLoader
  if (route && route.meta?.auth === false) {
    //继续执行
  } else {
    const staticPath = ['/welcome', '/403', '/404']
    if (!data.menuPathList.includes(pathname) && !staticPath.includes(pathname)) {
      return <Navigate to='/403' />
    }
  }

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
          <TabsFC />
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
