import { beforeCursor, afterCursor } from './selection'
import { save, restore } from './position'

export const insert = (node: HTMLElement, text: string) => {
  text = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

  const before = beforeCursor(node)
  const after = afterCursor(node)
  const pos = save(node)
  node.textContent = before + text + after
  pos.start = pos.end + text.length
  pos.end = pos.start
  restore(node, pos)

}

export const paste = (node: HTMLElement, event: ClipboardEvent) => {
  event.preventDefault()
  const text = ((event as any).originalEvent || event)
    .clipboardData
    .getData('text/plain')
    .replace(/\r/g, '')
  insert(node, text)
}

export const pasteEnter = (node: HTMLElement, isLegacy: boolean, event: KeyboardEvent) => {
  if (!isLegacy || event.key !== 'Enter' || event.shiftKey) return
  event.preventDefault()
  event.stopPropagation()

  if (afterCursor(node) == '') {
    insert(node, '\n ')
    const pos = save(node)
    pos.start = pos.end - 2
    restore(node, pos)
  } else {
    insert(node, '\n')
  }
}