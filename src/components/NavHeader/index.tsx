/**
 * 顶部导航栏
 */
import { MenuUnfoldOutlined, DownOutlined } from '@ant-design/icons'
import { Breadcrumb, Switch, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import styles from './index.module.less'
const NavHeader = () => {
  const breadList = [
    {
      title: '首页'
    },
    {
      title: '工作台'
    }
  ]

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '邮箱@163.com'
    },
    {
      key: '2',
      label: '退出'
    }
  ]
  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <MenuUnfoldOutlined />
        <Breadcrumb items={breadList} style={{ marginLeft: 10 }} />
      </div>
      <div className='right'>
        <Switch checkedChildren='暗黑' unCheckedChildren='默认' style={{ marginRight: 10 }} />
        <Dropdown menu={{ items }} trigger={['click']}>
          <span className={styles.nickName}>
            JackMa
            <DownOutlined />
          </span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
