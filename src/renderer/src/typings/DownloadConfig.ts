export type DownloadConfig = {
  'proxy-enable'?: boolean
  'proxy-url'?: string
  'hf-mirror-enable'?: boolean
  'hf-mirror-url'?: string
  'download-method'?: 'wget' | 'curl'
  'direct-url'?: string
}
