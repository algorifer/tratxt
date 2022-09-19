import { CodeJar } from 'codejar'
import { highlight } from './prism'

interface ActionOptions {
  value: string
  change(string): void
}

interface ActionReturn {
  update(options: ActionOptions): void
  destroy(): void
}

export type EditorAction = (element: HTMLElement, options: ActionOptions) => ActionReturn

const elementHighlight = (el: HTMLElement) => {
  el.innerHTML = highlight(el.textContent ?? '')
}

export const editorAction: EditorAction = (element, { value, change }) => {
  const jar = CodeJar(element, elementHighlight, {catchTab: false})
  
  const input = () => change(jar.toString())

  const destroy = () => {
    jar.destroy()
    element.removeEventListener('input', input)
  }
  
  const update = (options: ActionOptions) => {
    if (options.value !== jar.toString()) jar.updateCode(options.value)
  }
  
  element.addEventListener('input', input)
  
  return { update, destroy }
}
