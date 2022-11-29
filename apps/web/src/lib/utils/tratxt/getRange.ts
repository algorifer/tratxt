import type { LoadEvent } from "@sveltejs/kit"

export const getRange = (event: LoadEvent, pageSize: number): [number, number] => {
  const pageQuery = parseInt(event.url.searchParams.get('page') ?? '1', 10)
  const page = isNaN(pageQuery) ? 0 : pageQuery - 1
  const start = page * pageSize < 0 ? 0 : page * pageSize
  const end = start + pageSize - 1

  return [start, end]
}