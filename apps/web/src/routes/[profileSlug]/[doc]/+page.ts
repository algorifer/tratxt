import { getRange } from '$lib/utils/tratxt/getRange'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export let load: PageLoad = async (event) => {
  const { supabaseClient } = await getSupabase(event)
  const parent = await event.parent()

  const { data: doc } = await supabaseClient
    .from('docs')
    .select('*')
    .eq('author', event.params.profileSlug)
    .eq('name', event.params.doc)
    .single()

  if (!doc) throw error(404, { message: 'Doc not found' })

  const pageSize = 8
  const [start, end] = getRange(event, pageSize)

  const { data: records, count } = await supabaseClient
    .from('records')
    .select('*', { count: 'estimated' })
    .eq('author', event.params.profileSlug)
    .eq('project', event.params.doc)
    .order('date', { ascending: false })
    .range(start, end)

  return {
    doc,
    map: parent.docMaps.find(({ name }) => name === doc.name),
    records: records || [],
    count: count ?? 0,
    pageSize,
  }
}