import type { TratxtMeta, Record } from './types'
import { getMeta } from './getMeta'
import { getRecords } from './getTraes'

interface Result {
  meta: TratxtMeta,
  records: Record[]
}

export const parseTxt = (txt: string): Result => {
  const lines = txt.split('\n')

  const meta = getMeta(lines)
  const records = getRecords(meta.author, meta.url, lines)

  return {
    meta,
    records,
  }
}