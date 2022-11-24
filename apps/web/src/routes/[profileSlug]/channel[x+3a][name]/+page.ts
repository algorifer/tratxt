import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import type { PageLoad } from './$types'

export const load: PageLoad = async (event) => {
  const { supabaseClient } = await getSupabase(event)

  const pageQuery = parseInt(event.url.searchParams.get('page') ?? '1', 10)
  const page = isNaN(pageQuery) ? 0 : pageQuery - 1
  const start = page * 20 < 0 ? 0 : page * 20

  const { data: records, count } = await supabaseClient
    .from('records')
    .select('*', { count: 'estimated' })
    .eq('author', event.params.profileSlug)
    .eq('channel', event.params.name)
    .order('date', { ascending: false })
    .range(start, start + 20)

  const { data: doc } = await supabaseClient
    .from('docs')
    .select('name, body')
    .eq('author', event.params.profileSlug)
    .ilike('name', event.params.name)
    .single()

  return {
    records: records ?? [],
    count,
    doc,
  }
}