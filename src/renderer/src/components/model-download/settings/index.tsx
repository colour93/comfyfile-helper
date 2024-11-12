import { Button, Toast, Row, Space, Input, Col } from '@douyinfe/semi-ui'
import { useState, useEffect } from 'react'

const ModelDownloadSettings: React.FC = () => {
  const [logged, setLogged] = useState(false)
  const [logging, setLogging] = useState(false)

  useEffect(() => {
    window.electron.ipcRenderer.invoke('event:config').then((res) => {
      setLogged(Boolean(res.providers.liblib.token))
    })
  }, [])

  const handleLogin = async (): Promise<void> => {
    setLogging(true)
    const result = await window.electron.ipcRenderer.invoke('event:liblib-login')
    if (result.code === 0) {
      Toast.success(result.msg)
      setLogged(true)
    } else {
      Toast.error(result.msg)
    }
    setLogging(false)
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        <Row gutter={16}>
          <Col span={4}>
            <span>Liblib 登录状态</span>
          </Col>
          <Col span={20}>
            <Space>
              <span>{logged ? '已登录' : '未登录'}</span>
              <Button loading={logging} onClick={handleLogin}>
                登录
              </Button>
            </Space>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={4}>
            <span>Civitai API Key</span>
          </Col>
          <Col span={20}>
            <Input />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ModelDownloadSettings
