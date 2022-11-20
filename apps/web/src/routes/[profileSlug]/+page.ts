import type { PageLoad } from './$types'

export const load: PageLoad = async (event) => {
  try {
    const parent = await event.parent()
  
    const projectFilter = event.url.searchParams.get('project')
    const channelFilter = event.url.searchParams.get('channel')
    const tagFilter = event.url.searchParams.get('tag')
    const moodFilter = event.url.searchParams.get('mood')
    
    const records = parent.records.filter((it) => {
      if (projectFilter && it.project !== projectFilter) return false
      if (channelFilter && it.channel !== channelFilter) return false
      if (tagFilter && !it.tags.includes(tagFilter)) return false
      if (moodFilter && it.mood !== moodFilter) return false
      return true
    })
  
    const pageQuery = parseInt(event.url.searchParams.get('page') ?? '1', 10)
    const page = isNaN(pageQuery) ? 0 : pageQuery - 1
    const start = page * 25 < 0 ? 0 : page * 25
  
    return {
      records: records.slice(start, start + 25),
      allCount: parent.records.length,
      count: records.length,
    }
  } catch (error) {
      return {
        records: [],
        allCount: 0,
        count: 0,
      }
    
  }
}