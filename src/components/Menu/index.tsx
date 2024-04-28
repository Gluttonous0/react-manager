/**
 * 侧边栏设置
 */
import { Menu } from 'antd'
import { DesktopOutlined, SettingOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'

const SideMenu = () => {
  const navigate = useNavigate()
  const handleClickLogo = () => {
    navigate('/welcome')
  }
  const items = [
    {
      label: '工作台',
      key: 1,
      icon: <DesktopOutlined />
    },
    {
      label: '系统管理',
      key: 2,
      icon: <SettingOutlined />,
      children: [
        {
          label: '用户管理',
          key: 3,
          icon: <DesktopOutlined />
        }
      ]
    }
  ]
  return (
    <div>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img src='/imgs/logo.png' alt='' />
        <span>猛男货运</span>
      </div>
      <Menu defaultSelectedKeys={['1']} mode='inline' theme='dark' items={items} />
    </div>
  )
}
export default SideMenu
