import './App.less'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ConfigProvider, App as AntdApp, theme } from 'antd'
import AntdGlobal from './utils/AntdGlobal'
import './style/theme.less'
import { useBearStore } from './store'

function App() {
  const isDark = useBearStore(state => state.isDark)
  //方式一路由
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token，影响范围大
            colorPrimary: '#ed6c00'
            // borderRadius: 2,

            // 派生变量，影响范围小
            // colorBgContainer: '#f6ffed'
          },
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
        }}
      >
        {/* <BrowserRouter> */}
        <AntdApp>
          <AntdGlobal />
          <RouterProvider router={router} />
        </AntdApp>
        {/* </BrowserRouter> */}
      </ConfigProvider>
    </>
  )

  // return (
  //   <ConfigProvider
  //     theme={{
  //       token: {
  //         // Seed Token，影响范围大
  //         colorPrimary: '#ed6c00'
  //         // borderRadius: 2,

  //         // 派生变量，影响范围小
  //         // colorBgContainer: '#f6ffed'
  //       }
  //     }}
  //   >
  //     <BrowserRouter>
  //       <AntdApp>
  //         <AntdGlobal />
  //         <Router />
  //       </AntdApp>
  //     </BrowserRouter>
  //   </ConfigProvider>
  // )
}

export default App

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { ConfigProvider, App } from 'antd';
// import zhCN from 'antd/es/locale/zh_CN';
// import AntdGlobal from './utils/AntdGlobal';
// import YourComponent from './YourComponent';
// ReactDOM.render(
// <ConfigProvider locale={zhCN}>
// <App>
//   <AntdGlobal />
//   <YourComponent />
//   </App>
//   </ConfigProvider>,
//   document.getElementById('root') );

//   import React from 'react';
//    import { modal } from './utils/AntdGlobal';
//    const handleDelete = (id: string) => {
//     modal.confirm({ title: '确认', content: '确认删除该部门吗？', onOk: () => { handleDeleteSubmit(id); }, }); }; const handleDeleteSubmit = (id: string) => { // 删除逻辑 }; const YourComponent = () => { return ( <div> {/* 其他组件 */} <button onClick={() => handleDelete('some-id')}>删除</button> </div> ); }; export default YourComponent;
