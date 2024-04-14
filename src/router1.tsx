import { useRoutes } from 'react-router-dom'
import App from './App'
import { BrowserRouter, HashRouter, Route, Routes, Link, Navigate } from 'react-router-dom'

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
function BaseRouter() {
  const routes = useRoutes([
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
    }
  ])
  return routes
}

export default BaseRouter
