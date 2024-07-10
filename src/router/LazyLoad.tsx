import React, { lazy, Suspense, useDeferredValue } from 'react'
/**
 * 懶加載方法
 */
// 自定义的懒加载函数
const lazyLoad = (Comp: React.LazyExoticComponent<any>): React.ReactNode => {
  return (
    <Suspense fallback={<div></div>}>
      <Comp />
    </Suspense>
  )
}

export default lazyLoad
