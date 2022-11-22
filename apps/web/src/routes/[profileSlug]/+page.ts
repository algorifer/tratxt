import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import type { PageLoad } from './$types'

export const load: PageLoad = async (event) => {
  const { supabaseClient } = await getSupabase(event)

  const projectFilter = event.url.searchParams.get('project')
  const channelFilter = event.url.searchParams.get('channel')
  const tagFilter = event.url.searchParams.get('tag')
  const moodFilter = event.url.searchParams.get('mood')

  const pageQuery = parseInt(event.url.searchParams.get('page') ?? '1', 10)
  const page = isNaN(pageQuery) ? 0 : pageQuery - 1
  const start = page * 20 < 0 ? 0 : page * 20

  let recordsQuery = supabaseClient
    .from('records')
    .select('*', { count: 'estimated' })
    .eq('author', event.params.profileSlug)

  if (projectFilter) recordsQuery = recordsQuery.eq('project', projectFilter)
  if (channelFilter) recordsQuery = recordsQuery.eq('channel', channelFilter)
  if (moodFilter) recordsQuery = recordsQuery.eq('mood', moodFilter)
  if (tagFilter) recordsQuery = recordsQuery.contains('tags', tagFilter)

  const { data: records, count } = await recordsQuery
    .order('date', { ascending: false })
    .range(start, start + 20)

  return {
    records: records ?? [],
    count,
  }
}