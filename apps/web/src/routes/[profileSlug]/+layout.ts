import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { error } from '@sveltejs/kit'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async (event) => {
  const { supabaseClient } = await getSupabase(event)

  const { data: profile } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('name', event.params.profileSlug)
    .single()

  if (!profile) throw error(404, { message: 'Profile not funded' })

  return {
    profile
  }
}