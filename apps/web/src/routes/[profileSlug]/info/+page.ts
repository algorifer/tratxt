import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import type { PageLoad } from './$types'
import { getStatTable } from '$lib/utils/tratxt/getStatTable'
import { getParam } from '$lib/utils/tratxt/getParam'

export const load: PageLoad = async (event) => {
  const { supabaseClient } = await getSupabase(event)
 
  const { data } = await supabaseClient
    .from('records')
    .select('hash, project, channel, mood, time, tags')
    .eq('author', event.params.profileSlug)

  const table = getStatTable(data || [])
  const projects = getParam(table, 'project')
  const channels = getParam(table, 'channel')
  const tags = getParam(table, 'tags')
  const moods = getParam(table, 'mood')

  const allCount = table.hash.length
  const allTime = table.time.reduce((acc, it) => (acc + it), 0)

  const { data: docs } = await supabaseClient
    .from('docs')
    .select('name, body')
    .eq('author', event.params.profileSlug)
    .in('name', [
      'README', 
      ...projects.map(({ name }) => name), 
      ...channels.map(({ name }) => name)
    ])

  const { data: children } = await supabaseClient
    .from('docs')
    .select('name')
    .eq('author', event.params.profileSlug)
    .contains('parents', ['README'])

  return {
    allCount,
    allTime,
    projects,
    channels,
    tags,
    moods,
    docs: docs || [],
    children: children?.map(({name}) => name) ?? [],
  }
}