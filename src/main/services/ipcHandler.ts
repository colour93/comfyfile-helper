import { ipcMain } from 'electron'
import setupLiblibIpcHandler from './liblib/ipcHandler'
import ConfigManager from '../utils/config'

export default function setupServiceIpcHandler(): void {
  setupLiblibIpcHandler()

  ipcMain.handle('event:config', async () => {
    return ConfigManager.config
  })

  ipcMain.handle('event:update-config', async (_, config) => {
    ConfigManager.updateConfig(config)
  })
}
