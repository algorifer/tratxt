export const getSelection = (node: HTMLElement) => {
  if (node.parentNode?.nodeType == Node.DOCUMENT_FRAGMENT_NODE) {
    return (node.parentNode as Document).getSelection()!
  }
  return window.getSelection()!
}

export const beforeCursor = (node: HTMLElement): string => {
  const s = getSelection(node)
  const r0 = s.getRangeAt(0)
  const r = document.createRange()
  r.selectNodeContents(node)
  r.setEnd(r0.startContainer, r0.startOffset)
  return r.toString()
}

export const  afterCursor = (node: HTMLElement) => {
  const s = getSelection(node)
  const r0 = s.getRangeAt(0)
  const r = document.createRange()
  r.selectNodeContents(node)
  r.setStart(r0.endContainer, r0.endOffset)
  return r.toString()
}

export const findPadding = (text: string): [string, number, number] => {
  // Find beginning of previous line.
  let i = text.length - 1
  while (i >= 0 && text[i] !== '\n') i--
  i++
  // Find padding of the line.
  let j = i
  while (j < text.length && /[ \t]/.test(text[j])) j++
  return [text.substring(i, j) || '', i, j]
}