import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { error } from '@sveltejs/kit'
import type { LayoutLoad } from './$types'
import { createDocMap } from '$lib/utils/docs/createDocMap'

export const load: LayoutLoad = async (event) => {
  const { supabaseClient } = await getSupabase(event)

  const { data: profile } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('name', event.params.profileSlug)
    .single()

  const { data: docs } = await supabaseClient
    .from('docs')
    .select('name, parents')
    .eq('author', event.params.profileSlug)

  if (!profile) throw error(404, { message: 'Profile not funded' })

  return {
    profile,
    docMaps: createDocMap(docs ?? []),
  }
}