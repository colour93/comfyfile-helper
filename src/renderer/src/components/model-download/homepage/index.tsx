import { Col, Form, Row, Toast, Typography } from '@douyinfe/semi-ui'
import { MODEL_BASE_OPTIONS, MODEL_SOURCE_OPTIONS, MODEL_TYPE_OPTIONS } from './consts'
import { useEffect, useRef, useState } from 'react'
import { Model } from '@renderer/typings/Model'
import { interModelData } from '@renderer/utils/model'

const ModelDownloadHomepage: React.FC = () => {
  const { Input, Select } = Form

  const [model, setModel] = useState<Model>({})

  const formRef = useRef<Form>(null)

  useEffect(() => {
    formRef.current?.formApi.setValues(model)
  }, [model])

  const autoInfer = async (): Promise<void> => {
    const formUrl = formRef.current?.formApi.getValue('rawUrl')
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
    try {
      const newData = await interModelData(formUrl)
      setModel({
        ...model,
        ...newData
      })
      Toast.success({
        content: '检测完成',
        id: toastId,
        duration: 3
      })
    } catch (error) {
      Toast.error({ content: (error as Error).message, id: toastId, duration: 3 })
    }
  }

  return (
    <>
      <Form className="[&_*]:w-full" ref={formRef}>
        <Row gutter={16} align="bottom">
          <Col span={16}>
            <Input
              field="rawUrl"
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
