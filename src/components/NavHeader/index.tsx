/**
 * 顶部导航栏
 */
import { MenuUnfoldOutlined, DownOutlined } from '@ant-design/icons'
import { Switch, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import styles from './index.module.less'
import store, { useBearStore } from '@/store'
import storage from '@/utils/storage'
import BreadCrumb from './BreadCrumb'
import { useEffect } from 'react'
const NavHeader = () => {
  const { userInfo, isDark, updateTheme } = useBearStore()
  useEffect(() => {
    handleDark(isDark)
  }, [])
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: `邮箱:${userInfo.userEmail}`
    },
    {
      key: '2',
      label: '退出'
    }
  ]
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key == '2') {
      storage.remove('token')
      location.href = '/login?callback=' + encodeURIComponent(location.href)
    }
  }

  const handleDark = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.dataset.theme = 'dark'
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.dataset.theme = 'light'
      document.documentElement.classList.remove('dark')
    }
    storage.set('isDark', isDark)
    updateTheme(isDark)
  }
  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <MenuUnfoldOutlined />
        <BreadCrumb />
      </div>
      <div className='right'>
        <Switch
          checked={isDark}
          checkedChildren='暗黑'
          unCheckedChildren='默认'
          style={{ marginRight: 10 }}
          onChange={handleDark}
        />
        <Dropdown menu={{ items, onClick }} trigger={['click']}>
          <span className={styles.nickName}>
            {userInfo.userName}
            <DownOutlined />
          </span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
