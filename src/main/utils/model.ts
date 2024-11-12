import { ModelBase, ModelType } from '../typings/Model'

export const inferModelType = (content: string): ModelType | undefined => {
  if (!content) return
  const contentLow = content.toLowerCase()
  if (contentLow.includes('control')) {
    return 'controlnet'
  } else if (contentLow.includes('vae')) {
    return 'vae'
  } else if (contentLow.includes('lora')) {
    return 'loras'
  } else if (contentLow.includes('ckpt') || contentLow.includes('checkpoint')) {
    return 'checkpoints'
  } else if (contentLow.includes('upscale')) {
    return 'upscale_models'
  } else if (contentLow.includes('ipadapter')) {
    return 'ipadapter'
  } else if (contentLow.includes('embeddings')) {
    return 'embeddings'
  } else if (contentLow.includes('inpaint')) {
    return 'inpaint'
  } else if (contentLow.includes('diffusers')) {
    return 'diffusers'
  } else if (contentLow.includes('insightface')) {
    return 'insightface'
  }
  return
}

export const inferModelBase = (content: string): ModelBase | undefined => {
  if (!content) return
  const contentLow = content.toLowerCase()
  if (contentLow.includes('sd15') || contentLow.includes('sd1.5')) {
    return 'SD1.5'
  } else if (contentLow.includes('sdxl') || contentLow.includes('xl')) {
    return 'SDXL'
  }
  return
}
