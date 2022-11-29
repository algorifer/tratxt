import { highlight } from './highlight'
import { save, restore } from './position'
import { insert, paste, pasteEnter } from './insert'

interface Options {
  value: string
  onChange(value: string): void
  onSubmit(): void
}

export const action = (node: HTMLElement, { onChange, onSubmit }: Options) => {
  let listeners: [string, any][] = []
  let isLegacy = false // true if plaintext-only is not supported

  node.setAttribute('contenteditable', 'plaintext-only')
  node.setAttribute('spellcheck', 'false')
  node.style.outline = 'none'
  node.style.overflowWrap = 'break-word'
  node.style.overflowY = 'auto'
  node.style.whiteSpace = 'pre-wrap'

  highlight(node)
  if (node.contentEditable !== 'plaintext-only') isLegacy = true
  if (isLegacy) node.setAttribute('contenteditable', 'true')

  const toString = () => node.textContent ?? ''

  const setListener = <K extends keyof HTMLElementEventMap>(type: K, fn: (event: HTMLElementEventMap[K]) => void) => {
    listeners.push([type, fn])
    node.addEventListener(type, fn)
  }

  setListener('keydown', (event) => {
    if (event.defaultPrevented) return
    
    pasteEnter(node, isLegacy, event)

    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault()
      onSubmit()
      return
    }

    restore(node, save(node))
  })

  setListener('keyup', (event) => {
    if (event.defaultPrevented) return
    if (event.isComposing) return
    onChange(toString())
  })

  setListener('paste', (event) => paste(node, event))

  return {
    // update: ({ value }: Options) => {
    //   const pos = save(node)
    //   node.textContent = value
    //   highlight(node)
    //   restore(node, pos)
    // },
    destroy: () => {
      for (let [type, fn] of listeners) {
        node.removeEventListener(type, fn)
      }
    }
  }
}