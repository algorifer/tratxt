import type { TratxtMeta } from './types'
import { TratxtParams } from './types'

export const getMeta = (lines: string[]) => {
  const meta: TratxtMeta = {
    author: '',
    url: '',
    subscribes: []
  }
  
  for (const line of lines) {
    if (!line.startsWith('#')) return meta

    const [_hash, param, ...payload] = line.split(' ')
    const body = payload.filter((it) => Boolean(it))

    switch (param) {
      case TratxtParams.Name:
        const [, name] = body
        if (!name?.length) break
        meta.author = name
        break
      case TratxtParams.Url:
        const [, url] = body
        if (!url?.endsWith('.txt')) break
        meta.url = url
        break
      case TratxtParams.Description:
        const [, ...value] = body
        const description = value.join(' ')
        if (!description?.length) break
        meta.description = description
        break
      case TratxtParams.Prev:
        const [, prev] = body
        if (!prev?.length) break
        meta.prev = prev
        break
      case TratxtParams.Subscribe:
        const [alias, operator, link] = body
        if (!alias?.length || operator !== '=' || !link?.endsWith('.txt')) break
        meta.subscribes?.push({
          alias,
          url: link
        })
        break
      default:
        break
    }
  }

  return meta
}