import { nanoid } from 'nanoid'

const reChannel = /(\s|^)\/([a-zA-Z0-9]+)/g
const reProject = /(^|\s)(~[a-z\d-]+)/ig
const reMood = /(^|\s)(:([++]|[+]|[=]|[-]|[--])+)/ig
const reTime = /(^|\s)(;[\d]+)/ig
const reTag = /(^|\s)(#[a-z\d-]+)/ig

interface RecordMeta {
  project?: string
  channel?: string
  mood?: string
  time: number
  tags: string[]
}

interface Record extends RecordMeta {
  hash: string
  body: string
}

const cleanBody = (body: string, meta: RecordMeta): string => {
  let cleaned = body.trim()

  if (meta.project) cleaned = cleaned.replace(`~${meta.project}`, '').trim() 
  if (meta.channel) cleaned = cleaned.replace(`/${meta.channel}`, '').trim() 
  if (meta.mood) cleaned = cleaned.replace(`:${meta.mood}`, '').trim() 
  if (meta.time) cleaned = cleaned.replace(`;${meta.time}`, '').trim()

  return cleaned
}

export const parseRecord = (line: string): Omit<Record, 'date'> => {
  const meta: RecordMeta = {
    project: line.match(reProject)?.[0].trim().slice(1),
    channel: line.match(reChannel)?.[0].trim().slice(1),
    mood: line.match(reMood)?.[0].trim().slice(1),
    time: parseInt(line.match(reTime)?.[0].trim().slice(1) ?? '0', 10),
    tags: line.match(reTag)?.map((it) => it.trim().slice(1))
      .reduce((acc, it) => {
        if (acc.includes(it)) return acc
        acc.push(it)
        return acc
      }, [] as string[]) ?? []
  }

  return {
    hash: nanoid(7),
    body: cleanBody(line, meta),
    ...meta
  }
}
