import React, { Suspense } from 'react'

// 自定义的懒加载函数
const lazyLoad = (Comp: React.LazyExoticComponent<any>): React.ReactNode => {
  return (
    <Suspense fallback={<div></div>}>
      <Comp />
    </Suspense>
  )
}

export default lazyLoad
