import ConfigManager from '../../utils/config'

class LiblibService {
  private static _token = ConfigManager.config.providers.liblib?.token

  public static init(): void {
    this._token = ConfigManager.config.providers.liblib?.token
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
}

export default LiblibService
