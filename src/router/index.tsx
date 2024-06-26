/**
 * 路由设置
 */
import { Navigate, createBrowserRouter } from 'react-router-dom'
import Login from '@/views/login/Login'
import Error from '@/views/Erorr'
import NotFound from '@/views/NotFound'
import Welcome from '@/views/welcome'
import Layout from '@/layout/index'
import DashBoard from '@/views/dashboard'
import User from '@/views/system/user'
import Dept from '@/views/system/dept'
import Menu from '@/views/system/menu'
import AuthLoader from './AuthLoader'
import Role from '@/views/system/role'

const router = [
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
        element: <DashBoard />
      },
      {
        path: '/userList',
        element: <User />
      },
      {
        path: '/deptList',
        element: <Dept />
      },
      {
        path: '/menuList',
        element: <Menu />
      },
      {
        path: '/roleList',
        element: <Role />
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
