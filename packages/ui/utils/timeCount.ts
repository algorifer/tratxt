enum TimeType {
  Week = 'w',
  Day = 'd',
  Hour = 'h',
  Minute = 'm',
}

interface TimeLevel {
  id: TimeType
  value: number
  max?: number
}

export const getWeeks = (
  value: number, 
  daySize: number = 24,
  withMinutes: boolean = false
): number => {
  const hours = withMinutes ? Math.floor(value / 60) : value

  const days = Math.floor(hours / daySize)
  const weeks = Math.floor(days / 7)

  return weeks
}

export const getDays = (
  value: number, daySize: number = 24, withMinutes: boolean = false
): number => {
  const hours = withMinutes ? Math.floor(value / 60) : value
  const lastDays = hours % (daySize * 7)

  return Math.floor(lastDays / daySize)
}

export const getHours = (
  value: number, daySize: number = 24, withMinutes: boolean = false
): number => {
  const hours = withMinutes ? Math.floor(value / 60) : value

  return hours % daySize
}

export const getMinutes = (value: number, withMinutes: boolean = false): number => {
  if (!withMinutes) return 0

  return value % 60
}


export const getTimeLevels = (value: number, daySize: number, withMinutes: boolean): TimeLevel[] => {
  const levels: TimeLevel[] = []

  const weeks = getWeeks(value, daySize, withMinutes)
  const days = getDays(value, daySize, withMinutes)
  const hours = getHours(value, daySize, withMinutes)
  const minutes = getMinutes(value, withMinutes)

  if (weeks) {
    levels.push({
      id: TimeType.Week,
      value: weeks,
    })
  }

  if (days || weeks) {
    levels.push({
      id: TimeType.Day,
      value: days,
      max: 7,
    })
  }

  if (hours || days || weeks) {
    levels.push({
      id: TimeType.Hour,
      value: hours,
      max: daySize,
    })
  }

  if (withMinutes || minutes) {
    levels.push({
      id: TimeType.Minute,
      value: minutes,
      max: 60,
    })
  }

  return levels
}