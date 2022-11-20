import type { Record, RecordMeta } from './types'
import { createRecordHash } from './createHash'

const reChannel = /(\s|^)\/([a-zA-Z0-9]+)/g
const reProject = /(^|\s)(~[a-z\d-]+)/ig
const reMood = /(^|\s)(:([++]|[+]|[=]|[-]|[--])+)/ig
const reTime = /(^|\s)(;[\d]+)/ig
const reTag = /(^|\s)(#[a-z\d-]+)/ig

const cleanBody = (body: string, meta: RecordMeta): string => {
  let cleaned = body.trim()

  if (meta.project) cleaned = cleaned.replace(`~${meta.project}`, '').trim() 
  if (meta.channel) cleaned = cleaned.replace(`/${meta.channel}`, '').trim() 
  if (meta.mood) cleaned = cleaned.replace(`:${meta.mood}`, '').trim() 
  if (meta.time) cleaned = cleaned.replace(`;${meta.time}`, '').trim()

  return cleaned
}

export const parseRecord = (author: string, url: string, line: string): Record => {
  const [date, body] = line.replace('  ', '\t').split('\t')

  const time = parseInt(body.match(reTime)?.[0].trim().slice(1) ?? '0', 10)

  const meta: RecordMeta = {
    project: body.match(reProject)?.[0].trim().slice(1) ?? null,
    channel: body.match(reChannel)?.[0].trim().slice(1) ?? null,
    mood: body.match(reMood)?.[0].trim().slice(1) ?? null,
    time: parseInt(body.match(reTime)?.[0].trim().slice(1) ?? '0', 10),
    tags: body.match(reTag)?.map((it) => it.trim().slice(1))
      .reduce((acc, it) => {
        if (acc.includes(it)) return acc
        acc.push(it)
        return acc
      }, [] as string[]) ?? []
  }

  return {
    hash: createRecordHash(url, date, body),
    author,
    date,
    body: cleanBody(body, meta),
    ...meta
  }
}