import './App.less'
import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import { ConfigProvider, App as AntdApp } from 'antd'
import AntdGlobal from './utils/AntdGlobal'

function App() {
  // return <RouterProvider router={router} />   方式一路由
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: '#ed6c00'
          // borderRadius: 2,

          // 派生变量，影响范围小
          // colorBgContainer: '#f6ffed'
        }
      }}
    >
      <BrowserRouter>
        <AntdApp>
          <AntdGlobal />
          <Router />
        </AntdApp>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
