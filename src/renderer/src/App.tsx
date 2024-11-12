import { Button, Typography } from '@douyinfe/semi-ui'
import Versions from './components/Versions'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center text-md">
      <div>Powered by electron-vite</div>
      <div>
        Build an Electron app with <span>React</span>
        &nbsp;and <span>TypeScript</span>
      </div>
      <p>
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div>
        <div>
          <Typography.Text link={{ href: 'https://electron-vite.org/' }}>
            Documentation
          </Typography.Text>
        </div>
        <div>
          <Button onClick={ipcHandle} theme="solid">
            Send IPC
          </Button>
        </div>
      </div>
      <Versions />
    </div>
  )
}

export default App
