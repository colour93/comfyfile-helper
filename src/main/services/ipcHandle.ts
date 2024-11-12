import { ipcMain } from 'electron'
import LiblibService from './liblib'
import setupLiblibAuthIpcHandler from './liblib/auth/ipcHandler'

export default function setupServiceIpcHandler(): void {
  setupLiblibAuthIpcHandler()

  ipcMain.handle('event:service-info', async () => {
    return {
      liblib: {
        loginStatus: LiblibService.getLoginStatus()
      }
    }
  })
}
