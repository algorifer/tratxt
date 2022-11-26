import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import type { PageLoad } from './$types'

export const load: PageLoad = async (event) => {
  const { supabaseClient } = await getSupabase(event)

  const { data: records } = await supabaseClient
    .from('records')
    .select('hash, date, channel, project, mood, time, tags')
    .eq('author', event.params.profileSlug)
    .order('date', {ascending: false})

  return {
    records
  }
}