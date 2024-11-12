import { Button, Toast, Typography, Row, Space } from '@douyinfe/semi-ui'
import { useState, useEffect } from 'react'

const ModelDownloadSettings: React.FC = () => {
  const [logged, setLogged] = useState(false)
  const [logging, setLogging] = useState(false)

  useEffect(() => {
    window.electron.ipcRenderer.invoke('event:service-info').then((res) => {
      setLogged(res.liblib.loginStatus)
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
      <div>
        <Typography.Title heading={4}>Liblib</Typography.Title>
        <Row>
          <Space>
            <span>{logged ? '已登录' : '未登录'}</span>
            <Button loading={logging} onClick={handleLogin}>
              登录
            </Button>
          </Space>
        </Row>
      </div>
    </div>
  )
}

export default ModelDownloadSettings
