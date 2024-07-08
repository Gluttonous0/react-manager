import { Tabs } from 'antd'

export default function TabsFC() {
  const items = [
    {
      key: '1',
      label: 'Tab1'
    }
  ]
  return <Tabs items={items} />
}
