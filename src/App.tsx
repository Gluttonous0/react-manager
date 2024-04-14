import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Router from './router'

function App() {
  // return <RouterProvider router={router} />   方式一路由
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
