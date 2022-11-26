import { getSelection } from './selection'

enum Direction {
  Right,
  Left,
}

export interface Position {
  start: number
  end: number
  dir?: Direction
}

export const visit = (editor: HTMLElement, visitor: (el: Node) => 'stop' | undefined) => {
  const queue: Node[] = []

  if (editor.firstChild) queue.push(editor.firstChild)

  let el = queue.pop()

  while (el) {
    if (visitor(el) === 'stop')
      break

    if (el.nextSibling) queue.push(el.nextSibling)
    if (el.firstChild) queue.push(el.firstChild)

    el = queue.pop()
  }
}

export const save = (editorNode: HTMLElement): Position => {
  const s = getSelection(editorNode)
  const pos: Position = {start: 0, end: 0, dir: undefined}

  let {anchorNode, anchorOffset, focusNode, focusOffset} = s
  if (!anchorNode || !focusNode) throw 'error1'

  // If the anchor and focus are the editor element, return either a full
  // highlight or a start/end cursor position depending on the selection
  if (anchorNode === editorNode && focusNode === editorNode) {
    pos.start = (anchorOffset > 0 && editorNode.textContent) ? editorNode.textContent.length : 0
    pos.end = (focusOffset > 0 && editorNode.textContent) ? editorNode.textContent.length : 0
    pos.dir = (focusOffset >= anchorOffset) ? Direction.Right : Direction.Left
    return pos
  }

  // Selection anchor and focus are expected to be text nodes,
  // so normalize them.
  if (anchorNode.nodeType === Node.ELEMENT_NODE) {
    const node = document.createTextNode('')
    anchorNode.insertBefore(node, anchorNode.childNodes[anchorOffset])
    anchorNode = node
    anchorOffset = 0
  }
  if (focusNode.nodeType === Node.ELEMENT_NODE) {
    const node = document.createTextNode('')
    focusNode.insertBefore(node, focusNode.childNodes[focusOffset])
    focusNode = node
    focusOffset = 0
  }

  visit(editorNode, el => {
    if (el === anchorNode && el === focusNode) {
      pos.start += anchorOffset
      pos.end += focusOffset
      pos.dir = anchorOffset <= focusOffset ? Direction.Right : Direction.Left
      return 'stop'
    }

    if (el === anchorNode) {
      pos.start += anchorOffset
      if (!pos.dir) {
        pos.dir = Direction.Right
      } else {
        return 'stop'
      }
    } else if (el === focusNode) {
      pos.end += focusOffset
      if (!pos.dir) {
        pos.dir = Direction.Left
      } else {
        return 'stop'
      }
    }

    if (el.nodeType === Node.TEXT_NODE) {
      if (pos.dir != Direction.Right) pos.start += el.nodeValue!.length
      if (pos.dir != Direction.Left) pos.end += el.nodeValue!.length
    }
  })

  // collapse empty text nodes
  editorNode.normalize()

  return pos
}

export const restore = (editorNode: HTMLElement, pos: Position) => {
  const s = getSelection(editorNode)
  let startNode: Node | undefined, startOffset = 0
  let endNode: Node | undefined, endOffset = 0

  if (!pos.dir) pos.dir = Direction.Right
  if (pos.start < 0) pos.start = 0
  if (pos.end < 0) pos.end = 0

  // Flip start and end if the direction reversed
  if (pos.dir == Direction.Left) {
    const {start, end} = pos
    pos.start = end
    pos.end = start
  }

  let current = 0

  visit(editorNode, el => {
    if (el.nodeType !== Node.TEXT_NODE) return

    const len = (el.nodeValue || '').length
    if (current + len > pos.start) {
      if (!startNode) {
        startNode = el
        startOffset = pos.start - current
      }
      if (current + len > pos.end) {
        endNode = el
        endOffset = pos.end - current
        return 'stop'
      }
    }
    current += len
  })

  if (!startNode) startNode = editorNode, startOffset = editorNode.childNodes.length
  if (!endNode) endNode = editorNode, endOffset = editorNode.childNodes.length

  // Flip back the selection
  if (pos.dir == Direction.Left) {
    [startNode, startOffset, endNode, endOffset] = [endNode, endOffset, startNode, startOffset]
  }

  s.setBaseAndExtent(startNode, startOffset, endNode, endOffset)
}