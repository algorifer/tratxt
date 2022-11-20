export interface RecordMeta {
  project: string | null
  channel: string | null
  mood: string | null
  time: number
  tags: string[]
}

export interface Record extends RecordMeta {
  hash: string
  author: string
  date: string
  body: string
}

export interface TratxtMeta {
  author: string
  url: string
  subscribes: TratxtSubscribe[] 
  description?: string
  site?: string
  prev?: string
}

export interface TratxtSubscribe {
  alias: string
  url: string
}

export enum TratxtParams {
  Name = 'name',
  Url = 'url',
  Description = 'description',
  Site = 'site',
  Subscribe = 'subscribe',
  Prev = 'prev',
}

export interface RecordTable {
  hashes: string[]
  dates: string[]
  projects: (string | null)[]
  channels: (string | null)[]
  moods: (string | null)[]
  times: number[] 
  tags: string[][]
  bodies: string[]
}

export interface ParamEntity {
  name: string
  hashes: string[]
  count: number
  time: number
}