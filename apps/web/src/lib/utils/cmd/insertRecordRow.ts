import { DateTime } from 'luxon'

export const insertRecordRow = (text: string, message: string): string => {
  const lines = text.split('\n')
  const timestamp = DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm:ssZZ")
  const record = `${timestamp}  ${message}`

  for (const [index, line] of lines.entries()) {
    if (line.length === 0) {
      return [...lines.slice(0, index + 1), record, ...lines.slice(index + 1)].join('\n')
    }
  }

  return [...lines, '', record].join('\n')
}