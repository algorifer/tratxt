import type { Base, Report, TimeRecord } from '$lib/types'

export const stopTracker = (base: Base): Base => {
  const {current} = base

  if (!current) return base

  const end = Date.now()

  const report: Report | null = current.report.length ? {
    id: crypto.randomUUID(),
    content: current.report,
    doc: current.doc,
    tags: current.tags,
    rate: current.rate,
    createdAt: end,
  } : null

  const record: TimeRecord = {
    id: crypto.randomUUID(),
    start: current.start,
    time: end - current.start,
    rate: current.rate,
    doc: current.doc,
    report: report?.id ?? null,
    tags: current.tags,
  }

  return {
    ...base,
    times: [...base.times, record],
    reports: report ? [...base.reports, report] : base.reports,
    current: null,
  }
}