/**
 * 路由设置
 */
import { Navigate, createBrowserRouter, useRoutes } from 'react-router-dom'
import Login from '@/views/login/Login'
import Error from '@/views/Erorr'
import NotFound from '@/views/NotFound'
import Welcome from '@/views/welcome'
import Layout from '@/layout/index'

const router = [
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/welcome',
        element: <Welcome />
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

export default function Router() {
  return useRoutes(router)
}

// export default createBrowserRouter(router)  方式一路由
