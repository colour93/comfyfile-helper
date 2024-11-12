import { ipcMain, session } from 'electron'
import createLiblibAuthWindow from './window'
import LiblibService from '..'

export default function setupLiblibAuthIpcHandler(): void {
  ipcMain.handle('event:liblib-login', async () => {
    const win = createLiblibAuthWindow()
    let count = 0
    return new Promise((resolve) => {
      win.webContents.on('did-finish-load', async () => {
        try {
          count++
          await session.defaultSession.cookies
            .get({ url: 'https://www.liblib.art' })
            .then((cookies) => {
              const tokenCookie = cookies.find((cookie) => cookie.name === 'usertoken')
              if (tokenCookie) {
                console.log('已登录', tokenCookie.value)
                resolve({
                  code: 0,
                  msg: '登录成功'
                })
                LiblibService.updateToken(tokenCookie.value)
                win.close()
              }
            })
            .catch((error) => {
              console.error(error)
            })
          console.log(count)
        } catch (error) {
          console.error(error)
        }
      })
    })
  })
}
