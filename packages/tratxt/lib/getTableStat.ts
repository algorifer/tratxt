import type { RecordTable, ParamEntity } from './types'

export const getRecordCount = (table: RecordTable): number => table.hashes.length
export const getAllTime = (
  table: RecordTable
): number => table.times.reduce((acc, it) => (acc + it), 0)

const getTimesByIndexes = (
  table: RecordTable, indexes: number[]
) => indexes.reduce((acc, i) => (acc + table.times[i]), 0)
const getParamsByIndexes = <T>(
  table: RecordTable, indexes: number[], param: keyof RecordTable
): T[] => indexes.map((i) => table[param][i] as T)

export const getParamEntities = (table: RecordTable, param: keyof RecordTable): ParamEntity[] => {
  const indexes: Map<string, number[]> = new Map()

  const addIndex = (value: string, index: number) => {
    const prev = indexes.get(value) ?? []
    prev.push(index)
    indexes.set(value, prev)
  }

  for (const [index, value] of table[param].entries()) {
    if (Array.isArray(value)) {
      for (const it of value) {
        addIndex(it, index)
      }
    }

    if (typeof value === 'string') {
      addIndex(value, index)
    }
  }

  const entities: ParamEntity[] = []

  for (const [name, list] of indexes.entries()) {
    entities.push({
      name,
      hashes: getParamsByIndexes<string>(table, list, 'hashes'),
      count: list.length,
      time: getTimesByIndexes(table, list)
    })
  }

  return entities
}