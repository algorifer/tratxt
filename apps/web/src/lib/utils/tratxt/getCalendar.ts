import { DateTime } from 'luxon'
import type { DatedTable } from './getStatTable'
import { getTimeRecordsByDay } from './getTimeRecords'

export interface TimeLine {
  start: number
  end: number
}

interface Day {
  day: string
  weekDay: number
  time: number
  timeLines: TimeLine[]
}

export type Calendar = Day[][]

export const getTimeLine = (dt: DateTime, duration: number): TimeLine => {
  const hours = dt.hour
  const minutes = dt.minute
  const end = hours * 60 + minutes
  const start = end - duration
  const all = 24 * 60

  return {
    start: Math.floor(start / all * 100),
    end: Math.floor(end / all * 100)
  }
} 

const getLastDays = () => {
  const now = DateTime.now()
  const days = [now.minus({ week: 53 })]

  while (days[days.length - 1] < now) {
    const prev = days[days.length - 1]
    days.push(prev.plus({ day: 1 }))
  }

  return days
}

const getYearDays = (year: number) => {
  const days = [DateTime.fromObject({ year })]
  let stop = false

  while (!stop) {
    const next = days[days.length - 1].plus({ day: 1 })

    if (next.hasSame(days[0], 'year')) {
      days.push(next)
    } else {
      stop = true
    }
  }

  return days
}

const getMonthDays = (year: number, month: number) => {
  const days = [DateTime.fromObject({ year, month })]
  let stop = false

  while (!stop) {
    const next = days[days.length - 1].plus({ day: 1 })

    if (next.hasSame(days[0], 'month')) {
      days.push(next)
    } else {
      stop = true
    }
  }

  return days
}

const getDays = (year?: number | null, month?: number | null) => {
  if (!year) return getLastDays()
  if (!month) return getYearDays(year)
  return getMonthDays(year, month)
}

export const getCalendar = (table: DatedTable, year?: number | null, month?: number | null): Calendar => {
  const records = getTimeRecordsByDay(table)
  const days = getDays(year, month)

  return days.reduce((acc, it, index, arr) => {
    const times = records[it.toISODate()] ?? []
    const day: Day = {
      day: it.toISODate(),
      weekDay: it.weekday,
      time: times.reduce((acc, { time }) => (acc + time), 0),
      timeLines: times.map(({date, time}) => getTimeLine(date, time)),
    }

    if (arr[index - 1]?.hasSame(it, 'week')) {
      acc[acc.length - 1].push(day)
    } else {
      acc.push([day])
    }
    
    return acc
  }, [] as Day[][])
}