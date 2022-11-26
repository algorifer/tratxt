import type { DateTime } from 'luxon'
import type { DatedTable } from './getStatTable'

export interface TimeRecord {
  date: DateTime
  time: number
}

export const getTimeRecordsByDay = (table: DatedTable): Record<string, TimeRecord[]> => {
  const records: Record<string, TimeRecord[]> = {}

  for (const [index, dt] of table.date.entries()) {
    const day = dt.toISODate()
    const arr = records[day] ?? []
    arr.push({
      date: dt,
      time: table.time[index]
    })
    records[day] = arr
  }

  return records
}