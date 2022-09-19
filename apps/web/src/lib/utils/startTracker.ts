import type { Base, Doc } from '$lib/types'
import { Rate } from '$lib/types'

export const startTracker = (base: Base, doc: Doc | null): Base => {
  const start = Date.now()

  return {
    ...base,
    current: {
      start,
      doc: doc?.id ?? null,
      report: '',
      tags: doc?.tags ?? [],
      rate: Rate.Ok,
    }
  }
}