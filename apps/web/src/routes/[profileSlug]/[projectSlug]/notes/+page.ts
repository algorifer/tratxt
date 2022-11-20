import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import type { PageLoad } from './$types'
import { normalizeArray } from '$lib/utils/normalizeArray'

export const load: PageLoad = async (event) => {
  const { supabaseClient } = await getSupabase(event)
  const parent = await event.parent()

  const { data } = await supabaseClient
    .from('notes')
    .select('id, link_id, title, author (id, slug), created_at')
    .eq('project', parent.project.id)

  return {
    notes: data?.map((it) => {
      const author = normalizeArray(it.author)

      return {
        ...it,
        author: {
          id: author?.id as string,
          slug: author?.slug as string,
        }
      }
    }) ?? []
  }
}