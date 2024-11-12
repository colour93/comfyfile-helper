import path from 'path'
import fs from 'fs/promises'
import { Config } from '../typings/Config'
import _ from 'lodash'
const configPath = path.resolve('data', 'config.json')

const defaultConfig: Config = {
  providers: {
    liblib: {
      token: null
    },
    civitai: {
      token: null
    }
  },
  download: {
    hfMirror: {
      url: null,
      enable: false
    },
    proxy: {
      url: null,
      enable: false
    },
    method: 'wget'
  }
}

class ConfigManager {
  public static config = defaultConfig

  public static async initConfig(): Promise<void> {
    console.log('初始化配置')
    try {
      await fs.access(configPath)
    } catch {
      await fs.mkdir(path.dirname(configPath), { recursive: true })
      await fs.writeFile(configPath, JSON.stringify(defaultConfig, null, 2))
    }
    const config = await fs.readFile(configPath, 'utf8')
    try {
      ConfigManager.config = JSON.parse(config)
    } catch (error) {
      console.error('读取配置文件失败', error)
      ConfigManager.config = defaultConfig
    }
  }

  public static async updateConfig(config: Partial<Config>): Promise<void> {
    _.merge(ConfigManager.config, config)
    await fs.writeFile(configPath, JSON.stringify(ConfigManager.config, null, 2))
  }
}

export default ConfigManager
