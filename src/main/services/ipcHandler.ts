import { ipcMain } from 'electron'
import LiblibService from './liblib'
import setupLiblibIpcHandler from './liblib/ipcHandler'

export default function setupServiceIpcHandler(): void {
  setupLiblibIpcHandler()

  ipcMain.handle('event:service-info', async () => {
    return {
      liblib: {
        loginStatus: LiblibService.getLoginStatus()
      }
    }
  })
}
