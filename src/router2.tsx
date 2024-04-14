import { Link, Outlet, createBrowserRouter, createHashRouter, useParams } from 'react-router-dom'
import App from './App'

function ReactDemo() {
  return (
    <h2>
      欢迎学习React<Link to={'/'}>Back</Link>
    </h2>
  )
}

function ViteDemo() {
  return <h2>欢迎学习Vite</h2>
}

function Order() {
  const params = useParams()
  return <h2>订单组件,订单ID：{params.id}</h2>
}

function Goods() {
  const params = useParams()
  return (
    <div>
      <h2>商品主页：</h2>
      <span>商品ID：{params.goodsId}</span>
      <span>订单ID：{params.id}</span>
    </div>
  )
}

function Goods2() {
  const params = useParams()
  return (
    <div>
      <h2>商品主页：</h2>
      <Outlet></Outlet>
    </div>
  )
}

const routes = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />
    },
    {
      path: '/react',
      element: <ReactDemo />
    },
    {
      path: '/vite',
      element: <ViteDemo />
    },
    {
      path: '/order/:id',
      element: <Order />
    },
    {
      path: '/goods/:goodsId/order/:id',
      element: <Goods />
    },
    {
      path: '/goods',
      element: <Goods2 />,
      children: [
        {
          path: 'list',
          element: (
            <div>
              <p>商品1</p>
              <p>商品2</p>
            </div>
          )
        }
      ]
    }
  ],
  {
    basename: '/app'
  }
)

export default routes
