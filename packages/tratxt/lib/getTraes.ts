import type { Record } from './types'
import { parseRecord } from './parseRecord'

export const getRecords = (author: string, url: string, lines: string[]): Record[] => {
  const traes: Record[] = []

  for (const line of lines) {
    if (!line.startsWith('#') && line.length) traes.push(parseRecord(author, url, line))
  }

  return traes
}