import { Col, Form, Row, Toast, Typography } from '@douyinfe/semi-ui'
import { MODEL_BASE_OPTIONS, MODEL_SOURCE_OPTIONS, MODEL_TYPE_OPTIONS } from './consts'
import { useRef } from 'react'

const ModelDownloadHomepage: React.FC = () => {
  const { Input, Select } = Form

  const formRef = useRef<Form>(null)

  const autoInfer = (): void => {
    const formUrl = formRef.current?.formApi.getValue('url')
    if (!formUrl) {
      Toast.error('请输入模型地址')
      return
    }
    const toastId = Date.now().toString()
    Toast.info({
      content: '检测中',
      id: toastId,
      duration: 0
    })
    Toast.success({
      content: '检测完成',
      id: toastId,
      duration: 3
    })
  }

  return (
    <>
      <Form className="[&_*]:w-full" ref={formRef}>
        <Row gutter={16} align="bottom">
          <Col span={16}>
            <Input
              field="url"
              label="模型地址"
              extraText={
                <Typography.Text link onClick={autoInfer}>
                  自动检测
                </Typography.Text>
              }
            />
          </Col>
          <Col span={8}>
            <Input field="filename" label="模型名称" />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Select field="source" label="模型来源" optionList={MODEL_SOURCE_OPTIONS} />
          </Col>
          <Col span={8}>
            <Select
              allowCreate
              field="type"
              label="模型类型"
              filter
              optionList={MODEL_TYPE_OPTIONS}
            />
          </Col>
          <Col span={8}>
            <Select field="base" label="模型基座" optionList={MODEL_BASE_OPTIONS} />
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default ModelDownloadHomepage
