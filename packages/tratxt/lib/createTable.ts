import type { Record, RecordTable } from './types'

export const createTable = (records: Record[]): RecordTable => {
  const hashes: string[] = []
  const dates: string[] = []
  const projects: (string | null)[] = []
  const channels: (string | null)[] = []
  const moods: (string | null)[] = []
  const times: number[] = []
  const tags: string[][] = []
  const bodies: string[] = []

  for (const record of records) {
    hashes.push(record.hash)
    dates.push(record.date)
    projects.push(record.project ?? null)
    channels.push(record.channel ?? null)
    moods.push(record.mood ?? null)
    times.push(record.time)
    tags.push(record.tags)
    bodies.push(record.body)
  }

  return {
    hashes,
    dates,
    projects,
    channels,
    moods,
    times,
    tags,
    bodies,
  }
}