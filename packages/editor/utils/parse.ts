import { reUrl } from './re'

export const bodyParse = (text: string): string => {
  let html = text

  html = html.replace(reUrl, (str) => {
    const parsed = `<a href="${str.trim()}" target="_blank">LINK↗</span>`
    if (str.startsWith(' ')) return ` ${parsed}`
    return parsed
  })

  return html
}