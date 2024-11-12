import { Model, ModelBase, ModelSource, ModelType } from '@renderer/typings/Model'

export const interModelData = async (rawUrl: string): Promise<Model> => {
  const source = inferModelSource(rawUrl)

  if (source == 'civitai') {
  } else if (source == 'liblib') {
    const modelData = await getModelDataFromLiblib(rawUrl)
    if (!modelData) {
      return {
        source
      }
    }
    return modelData
  } else {
    const filename = inferModelFilenameFromUrl(rawUrl)
    const type = inferModelType(rawUrl)
    const base = inferModelBase(rawUrl)
    console.log('source', source)
    console.log('filename', filename)
    console.log('type', type)
    console.log('base', base)
    return { source, type, base, rawUrl, filename }
  }
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

export const inferModelType = (rawUrl: string): ModelType | undefined => {
  if (!rawUrl) return
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

export const inferModelFilenameFromUrl = (rawUrl: string): string | undefined => {
  if (!rawUrl) return
  const urlObj = new URL(rawUrl)
  return urlObj.pathname.split('/').pop()
}

export const getModelDataFromLiblib = async (rawUrl: string): Promise<Model | undefined> => {
  if (!rawUrl) return
  return (await window.electron.ipcRenderer.invoke('event:liblib-get-model-data', rawUrl)).data
}
