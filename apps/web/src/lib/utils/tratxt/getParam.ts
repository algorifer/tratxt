import type { StatTable } from './getStatTable'

type ParamsKey = 'project' | 'channel' | 'mood' | 'tags'

export interface ParamStat {
  name: string
  count: number
  time: number
}

export const getParam = (table: StatTable, name: ParamsKey): ParamStat[] => {
  const params: Map<string, ParamStat> = new Map()

  const addParam = (it: string, index: number) => {
    const param = params.get(it)

    params.set(it, {
      name: it,
      count: (param?.count ?? 0) + 1,
      time: (param?.time ?? 0) + table.time[index],
    })
  }

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