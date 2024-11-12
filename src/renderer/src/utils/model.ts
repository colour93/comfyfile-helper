import { Model, ModelBase, ModelSource, ModelType } from '@renderer/typings/Model'

export const interModelData = (rawUrl: string): Model => {
  const source = inferModelSource(rawUrl)
  const type = inferModelType(rawUrl)
  const base = inferModelBase(rawUrl)
  return { source, type, base, rawUrl }
}

export const inferModelSource = (rawUrl: string): ModelSource | undefined => {
  if (!rawUrl) return
  const url = rawUrl.toLowerCase()
  if (url.includes('huggingface.co')) {
    return 'huggingface'
  } else if (url.includes('civitai.com')) {
    return 'civitai'
  } else if (url.includes('liblib.art')) {
    return 'liblib'
  }
  return 'direct'
}

export const inferModelType = (rawUrl: string, source?: ModelSource): ModelType | undefined => {
  if (!rawUrl) return

  if (source == 'civitai' || source == 'liblib') {
  } else {
    const url = rawUrl.toLowerCase()
    if (url.includes('control')) {
      return 'controlnet'
    } else if (url.includes('vae')) {
      return 'vae'
    } else if (url.includes('lora')) {
      return 'loras'
    } else if (url.includes('ckpt') || url.includes('checkpoint')) {
      return 'checkpoints'
    } else if (url.includes('upscale')) {
      return 'upscale_models'
    } else if (url.includes('ipadapter')) {
      return 'ipadapter'
    } else if (url.includes('embeddings')) {
      return 'embeddings'
    } else if (url.includes('inpaint')) {
      return 'inpaint'
    } else if (url.includes('diffusers')) {
      return 'diffusers'
    } else if (url.includes('insightface')) {
      return 'insightface'
    }
  }

  return
}

export const inferModelBase = (rawUrl: string): ModelBase | undefined => {
  if (!rawUrl) return
  const url = rawUrl.toLowerCase()
  if (url.includes('sd15') || url.includes('sd1.5')) {
    return 'SD1.5'
  } else if (url.includes('sdxl') || url.includes('xl')) {
    return 'SDXL'
  }
  return 'others'
}
