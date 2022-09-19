import type { Base, Doc } from '$lib/types'

export const getDocTrackedTime = (
  base: Base | null, doc: Doc, time: number | null
): number => {
  if (!base) return 0

  const wroteTime = base.times.reduce((acc, it) => {
    if (it.doc === doc.id) {
      return acc + it.time
    }

    return acc
  }, 0) ?? 0

  const currentTime = base.current?.doc === doc.id && time ? wroteTime + time : wroteTime

  return Math.floor(currentTime / (1000 * 60 * 60))
}

export const getDocTodayTrackedTime = (
  base: Base | null, doc: Doc, time: number | null
): number => {

}