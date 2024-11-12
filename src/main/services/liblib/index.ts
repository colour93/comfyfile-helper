import axios from 'axios'
import ConfigManager from '../../utils/config'
import { inferModelBase, inferModelType } from '../../utils/model'
import { Model } from '../../typings/Model'

class LiblibService {
  private static _token = ConfigManager.config.providers.liblib?.token
  private static _axiosInstance = axios.create({
    baseURL: 'https://www.liblib.art/api',
    headers: {
      Token: this._token
    }
  })

  public static init(): void {
    this._token = ConfigManager.config.providers.liblib?.token
    this._axiosInstance = axios.create({
      baseURL: 'https://www.liblib.art/api',
      headers: {
        Token: this._token
      }
    })
  }

  public static updateToken(token: string): void {
    this._token = token
    ConfigManager.updateConfig({
      providers: {
        liblib: { token }
      }
    })
  }

  public static getLoginStatus(): boolean {
    return Boolean(this._token)
  }

  public static async getModelDownloadUrl(downloadApiUrl: string): Promise<string> {
    const resp = await axios
      .get(downloadApiUrl, {
        headers: {
          Token: this._token
        }
      })
      .then((resp) => resp.data)
    if (resp.code !== 0) {
      throw new Error(resp.msg)
    }
    return resp.data
  }

  public static async getModelData(rawUrl: string): Promise<Model> {
    const urlObj = new URL(rawUrl)
    const modelUuid = urlObj.pathname.split('/').pop()
    const resp = await this._axiosInstance(`/www/model/getByUuid/${modelUuid}`, {
      method: 'POST',
      data: JSON.stringify({})
    }).then((resp) => {
      return resp.data
    })

    if (resp.code !== 0) {
      throw new Error(resp.msg)
    }
    const metadata = resp.data
    if (metadata.versions.length === 0) {
      throw new Error('模型没有版本')
    }
    const filename = `${metadata.name}_${metadata.versions[0].name}_${metadata.versions[0].attachment.modelSourceName}`
    const downloadApiUrl = metadata.versions[0].attachment.modelSource
    const directUrl = await this.getModelDownloadUrl(downloadApiUrl)
    return {
      source: 'liblib',
      filename,
      type: inferModelType(filename + metadata.remark),
      base: inferModelBase(filename + metadata.remark),
      directUrl,
      rawUrl
    }
  }
}

export default LiblibService
