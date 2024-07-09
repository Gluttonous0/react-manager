import { Button, Form, Space } from 'antd'
import { useForm } from 'antd/es/form/Form'
/**
 * 搜索表单容器组件封装
 * @param props
 * @returns
 */

export default function SearchForm(props: any) {
  return (
    <Form form={props.form} layout='inline' initialValues={props.initialValues} className='search_form'>
      {props.children}
      <Form.Item>
        <Space>
          <Button type='primary' onClick={props.submit}>
            搜索
          </Button>
          <Button type='default' onClick={props.reset}>
            重置
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
