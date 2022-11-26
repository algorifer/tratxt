import type { Position } from './position'
import { reChannel, reProject, reMood, reTime, reTag, reUrl } from './re'

const reCommand = /^(edit:name|edit:desc|edit:site|start|stop|add:doc)/
const reNoRecord = /^(edit:name|edit:desc|edit:site|start)/

export const highlight = (node: HTMLElement, pos?: Position) => {
  let code = node.textContent
  if (!code) return

  code = code.replace(reCommand, '<font class="command">$&</font>')
  if (reNoRecord.test(code)) {
    node.innerHTML = code
    return
  }

  const decorate = (name: string) => (s: string) => {
    const str = `<span class="${name}">${s.trim()}</span>`
    if (s.startsWith(' ')) return ` ${str}`
    return str
  } 

  code = code.replace(reChannel, decorate('channel'))
  code = code.replace(reProject, decorate('project'))
  code = code.replace(reMood, decorate('mood'))
  code = code.replace(reTime, decorate('time'))
  code = code.replace(reTag, decorate('tag'))
  code = code.replace(reUrl, decorate('url'))

  node.innerHTML = code
}