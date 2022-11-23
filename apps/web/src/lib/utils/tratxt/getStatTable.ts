interface Record {
  hash: string
  project: string | null
  channel: string | null
  tags: string[]
  mood: string | null
  time: number
}

export interface StatTable {
  hash: string[]
  project: (string | null)[]
  channel: (string | null)[]
  tags: string[][]
  mood: (string | null)[]
  time: number[]
}

export const getStatTable = (records: Record[]): StatTable => {
  const table: StatTable = {
    hash: [],
    project: [],
    channel: [],
    tags: [],
    mood: [],
    time: [],
  }

  for (const record of records) {
    table.hash.push(record.hash)
    table.project.push(record.project)
    table.channel.push(record.channel)
    table.tags.push(record.tags)
    table.mood.push(record.mood)
    table.time.push(record.time)
  }

  return table
}