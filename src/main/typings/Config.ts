export type Config = {
  providers: {
    liblib?: {
      token: string | null
    }
    civitai?: {
      token: string | null
    }
  }
  download: {
    hfMirror: {
      url: string | null
      enable: boolean | null
    }
    proxy: {
      url: string | null
      enable: boolean | null
    }
    method: 'wget' | 'curl'
  }
}
