import { ipcMain } from 'electron'
import setupLiblibAuthIpcHandler from './auth/ipcHandler'
import LiblibService from '.'
export default function setupLiblibIpcHandler(): void {
  setupLiblibAuthIpcHandler()

  ipcMain.handle('event:liblib-get-model-data', async (_event, rawUrl: string) => {
    try {
      return {
        code: 0,
        data: await LiblibService.getModelData(rawUrl)
      }
    } catch (error) {
      return {
        code: 1,
        msg: (error as Error).message
      }
    }
  })
}
