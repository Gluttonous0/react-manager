import './loading.less'

let count = 0

export const showLoading = () => {
  if (count === 0) {
    const loading = document.getElementById('loading')
    loading?.style.setProperty('display', 'flex')
  }
  count++
}

export const hideLoading = () => {
  count--
  if (count === 0) {
    const loading = document.getElementById('loading')
    loading?.style.setProperty('display', 'none')
  }
}

// export const showLoading = () => {
//   if (count === 0) {
//     const loading = document.createElement('div')
//     loading.setAttribute('id', 'loading')
//     ReactDOM.createRoot(loading).render(<Loading />)
//   }
//   count++
// }

// export const hideLoading = () => {
//   if (count < 0) {
//     count--
//   }
//   if (count === 0) {
//     document.body.removeChild(document.getElementById('loading') as HTMLDivElement)
//   }
// }
