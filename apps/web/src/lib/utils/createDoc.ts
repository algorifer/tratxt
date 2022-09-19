import type { Base, Doc } from '../types'

interface FormPayload {
  title: string
  content: string
  estimate: number | null
  perDay: number | null
}

export const createDoc = (base: Base, payload: FormPayload): Base => {
  const createdAt = Date.now()

  const doc: Doc = {
    id: crypto.randomUUID(),
    title: payload.title,
    parent: [],
    content: payload.content,
    author: base.user.name,
    assigned: base.user.name,
    createdAt,
    updatedAt: createdAt,
    inProgress: false,
    estimate: payload.estimate,
    perDay: payload.perDay,
    tags: [],
  }

  return {
    ...base,
    docs: [...base.docs, doc],
  }
}