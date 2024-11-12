export type Config = {
  providers: {
    liblib?: {
      token: string | null
    }
    civitai?: {
      token: string | null
    }
    huggingface?: {
      mirror: string | null
    }
  }
  download: {
    proxy: string | null
    method: 'wget' | 'curl'
  }
}
