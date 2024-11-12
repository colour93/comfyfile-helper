import { BrowserWindow } from 'electron'

export default function createLiblibAuthWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 300,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    title: 'Liblib 登录'
  })

  win.loadURL('https://liblib.art/login')
  return win
}
