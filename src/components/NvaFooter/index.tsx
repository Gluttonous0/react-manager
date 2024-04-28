/**
 * 尾部部分
 */
import styles from './index.module.less'
const NavFooter = () => {
  return (
    <div className={styles.footer}>
      <div>
        <a href='https://baidu.com' target='_blank' rel='noreferrer'>
          河畔一角百度
        </a>
        <span className={styles.gutter}>|</span>
        <a href='https://baidu.com' target='_blank' rel='noreferrer'>
          React18开发
        </a>
        <span className={styles.gutter}>|</span>
        <a href='https://baidu.com' target='_blank' rel='noreferrer'>
          VUE全家桶
        </a>
        <span className={styles.gutter}>|</span>
        <a href='https://baidu.com' target='_blank' rel='noreferrer'>
          Vue3全栈
        </a>
      </div>
      <div>React通用后台管理系统</div>
    </div>
  )
}

export default NavFooter
