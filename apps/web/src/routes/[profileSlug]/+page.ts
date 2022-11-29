import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import type { PageLoad } from './$types'
import { getRange } from '$lib/utils/tratxt/getRange'

export const load: PageLoad = async (event) => {
  const { supabaseClient } = await getSupabase(event)

  const pageSize = 20
  const [start, end] = getRange(event, pageSize)

  const { data: records, count } = await supabaseClient
    .from('records')
    .select('*', { count: 'estimated' })
    .eq('author', event.params.profileSlug)
    .order('date', { ascending: false })
    .range(start, end)

  return {
    records: records ?? [],
    count: count ?? 0,
    pageSize,
  }
}