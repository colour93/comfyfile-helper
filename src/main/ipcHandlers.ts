import { ipcMain } from 'electron'
import setupServiceIpcHandler from './services/ipcHandler'

export default function setupIpcHandlers(): void {
  // IPC test
  ipcMain.on('ping', () => console.log('pong'))
  setupServiceIpcHandler()
}
