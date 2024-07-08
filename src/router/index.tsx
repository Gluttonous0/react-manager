/**
 * 路由设置
 */
import { Navigate, createBrowserRouter } from 'react-router-dom'
import Login from '@/views/login/Login'
import Error from '@/views/Erorr'
import NotFound from '@/views/NotFound'
import Welcome from '@/views/welcome'
import Layout from '@/layout/index'
import AuthLoader from './AuthLoader'
import lazyLoad from './LazyLoad'
import React from 'react'

export const router = [
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    id: 'layout',
    element: <Layout />,
    loader: AuthLoader,
    children: [
      {
        path: '/welcome',
        element: <Welcome />
      },
      {
        path: '/dashboard',
        element: lazyLoad(React.lazy(() => import('@/views/dashboard')))
      },
      {
        path: '/userList',
        element: lazyLoad(React.lazy(() => import('@/views/system/user')))
      },
      {
        path: '/deptList',
        element: lazyLoad(React.lazy(() => import('@/views/system/dept')))
      },
      {
        path: '/menuList',
        element: lazyLoad(React.lazy(() => import('@/views/system/menu')))
      },
      {
        path: '/roleList',
        element: lazyLoad(React.lazy(() => import('@/views/system/role')))
      },
      {
        path: '/orderList',
        element: lazyLoad(React.lazy(() => import('@/views/order/OrderList')))
      },
      {
        path: '/orderCluster',
        element: lazyLoad(React.lazy(() => import('@/views/order/OrderCluster')))
      },
      {
        path: '/driverList',
        element: lazyLoad(React.lazy(() => import('@/views/order/DriverList')))
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  },
  {
    path: '/404',
    element: <NotFound />
  },
  {
    path: '/403',
    element: <Error />
  }
]

// export default function Router() {
//   return useRoutes(router)
// }

//方式一路由
export default createBrowserRouter(router)
