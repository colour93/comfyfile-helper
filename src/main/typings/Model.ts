export type ModelSource = 'huggingface' | 'civitai' | 'liblib' | 'direct'

export type ModelType =
  | 'checkpoints'
  | 'controlnet'
  | 'loras'
  | 'vae'
  | 'embeddings'
  | 'inpaint'
  | 'diffusers'
  | 'pth'
  | 'insightface'
  | 'upscale_models'
  | 'ipadapter'
  | string

export type ModelBase = 'SDXL' | 'SD1.5' | 'others'

export type Model = {
  source?: ModelSource
  type?: ModelType
  base?: ModelBase
  rawUrl?: string
  filename?: string
  directUrl?: string
}
