import { Button, Col, Divider, Form, Row, TextArea, Toast, Typography } from '@douyinfe/semi-ui'
import {
  DOWNLOAD_METHOD_OPTIONS,
  MODEL_BASE_OPTIONS,
  MODEL_SOURCE_OPTIONS,
  MODEL_TYPE_OPTIONS
} from './consts'
import { useEffect, useRef, useState } from 'react'
import { Model } from '@renderer/typings/Model'
import { getModelDownloadShell, interModelData } from '@renderer/utils/model'
import { FormState } from '@douyinfe/semi-ui/lib/es/form'
import { DownloadConfig } from '@renderer/typings/DownloadConfig'

const ModelDownloadHomepage: React.FC = () => {
  const { Input, Select, Switch } = Form

  const [shell, setShell] = useState<string>('')
  const [generating, setGenerating] = useState<boolean>(false)

  const [model, setModel] = useState<Model>({})
  const [downloadConfig, setDownloadConfig] = useState<DownloadConfig>({})

  const modelFormRef = useRef<Form<Model>>(null)
  const downloadFormRef = useRef<Form<DownloadConfig>>(null)

  useEffect(() => {
    modelFormRef.current?.formApi.setValues(model)
    if (model.directUrl) downloadFormRef.current?.formApi.setValue('direct-url', model.directUrl)
  }, [model])

  useEffect(() => {
    window.electron.ipcRenderer.invoke('event:config').then((res) => {
      downloadFormRef.current?.formApi.setValues({
        'proxy-enable': res.download.proxy.enable,
        'proxy-url': res.download.proxy.url,
        'hf-mirror-enable': res.download.hfMirror.enable,
        'hf-mirror-url': res.download.hfMirror.url,
        'download-method': res.download.method
      })
    })
  }, [])

  const handleDownloadConfigChange = (formState: FormState): void => {
    setDownloadConfig(formState.values || {})
    window.electron.ipcRenderer.invoke('event:update-config', {
      download: {
        proxy: {
          url: downloadConfig['proxy-url'],
          enable: downloadConfig['proxy-enable']
        },
        method: downloadConfig['download-method'],
        hfMirror: {
          url: downloadConfig['hf-mirror-url'],
          enable: downloadConfig['hf-mirror-enable']
        }
      }
    })
  }

  const autoInfer = async (): Promise<void> => {
    const formUrl = modelFormRef.current?.formApi.getValue('rawUrl')
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

  const handleGenerate = (): void => {
    setGenerating(true)
    const shell = getModelDownloadShell(
      modelFormRef.current?.formApi.getValues() || {},
      downloadFormRef.current?.formApi.getValues() || {}
    )
    if (!shell) {
      Toast.error('生成失败')
      setGenerating(false)
      return
    }
    setShell(shell)
    setGenerating(false)
  }

  return (
    <div className="[&_*]:w-full">
      <Form
        ref={modelFormRef}
        onChange={(formState) => {
          setModel(formState.values || {})
        }}
      >
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
      <Form ref={downloadFormRef} onChange={handleDownloadConfigChange}>
        <Row gutter={16}>
          <Col span={16}>
            <Input field="hf-mirror-url" label="HF Mirror" />
          </Col>
          <Col span={8}>
            <Switch field="hf-mirror-enable" label="启用 HF Mirror" />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={16}>
            <Input field="proxy-url" label="代理地址" />
          </Col>
          <Col span={8}>
            <Switch field="proxy-enable" label="启用代理" />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={16}>
            <Input field="direct-url" label="直链地址" />
          </Col>
          <Col span={8}>
            <Select field="download-method" label="下载方式" optionList={DOWNLOAD_METHOD_OPTIONS} />
          </Col>
        </Row>
      </Form>
      <Divider className="!mb-4" />
      <Row gutter={16}>
        <Col span={22}>
          <TextArea value={shell} onChange={setShell} />
        </Col>
        <Col span={2}>
          <div className="flex flex-col gap-2 [&_*]:w-auto">
            <Button theme="solid" onClick={handleGenerate} loading={generating}>
              生成
            </Button>
            <Button
              onClick={async () => {
                await navigator.clipboard.writeText(shell)
                Toast.success('复制成功')
              }}
            >
              复制
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ModelDownloadHomepage
