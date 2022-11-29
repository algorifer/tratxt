import { Duration } from 'luxon'
import type { DatedTable } from './getStatTable'

type ParamsKey = 'project' | 'channel' | 'mood' | 'tags'

export interface ParamItem {
  name: string
  count: number
  time: number
  duration: string
  percent: number
}

const addParamFn = (table: DatedTable, allTime: number, params: Map<string, ParamItem>) => (it: string, index: number) => {
  const param = params.get(it)
  const count = (param?.count ?? 0) + 1
  const time = (param?.time ?? 0) + table.time[index]
  const percent = time && Math.floor((time / allTime) * 100)
  const duration = Duration.fromObject({ minutes: time }).toFormat('h:mm')

  params.set(it, { name: it, count, time, duration, percent })
}

export const getParam = (table: DatedTable, allTime: number, name: ParamsKey): ParamItem[] => {
  const params: Map<string, ParamItem> = new Map()
  const addParam = addParamFn(table, allTime, params)

  if (name === 'tags') {
    for (const [index, tags] of table.tags.entries()) {
      for (const tag of tags) {
        addParam(tag, index)
      }
    }

    return Array.from(params.values())
  }

  for (const [index, it] of table[name].entries()) {
    if (it) addParam(it, index)
  }

  return Array.from(params.values())
}

export const getYears = (table: DatedTable, allTime: number) => {
  const params: Map<string, ParamItem> = new Map()
  const addParam = addParamFn(table, allTime, params)

  for (const [index, date] of table.date.entries()) {
    addParam(date.year.toString(), index)
  }

  return Array.from(params.values())
}

export const getMonths = (table: DatedTable, allTime: number) => {
  const params: Map<string, ParamItem> = new Map()
  const addParam = addParamFn(table, allTime, params)

  for (const [index, date] of table.date.entries()) {
    addParam(date.monthLong, index)
  }

  return Array.from(params.values())
}