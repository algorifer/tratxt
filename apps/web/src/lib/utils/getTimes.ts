import { DateTime } from 'luxon'

export const getDurationPercentByDay = (date: string, duration: number): [number, number] => {
  const dt = DateTime.fromISO(date)
  const hours = dt.hour
  const minutes = dt.minute
  const end = hours * 60 + minutes
  const start = end - duration
  const all = 24 * 60
  const startPercent = Math.floor(start / all * 100)
  const endPercent = Math.floor(end / all * 100)

  return [startPercent, endPercent]
}