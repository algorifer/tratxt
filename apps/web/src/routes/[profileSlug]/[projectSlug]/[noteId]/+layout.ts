import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { error } from '@sveltejs/kit'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async (event) => {
  const { supabaseClient } = await getSupabase(event)

  const { data, error: noteError, status } = await supabaseClient
    .from('notes')
    .select('*, author (id, slug), project!inner (id, slug, author!inner (id, slug))')
    .eq('link_id', event.params.noteId)
    .eq('project.slug', event.params.projectSlug)
    .eq('project.author.slug', event.params.authorSlug)
    .single()

  if (noteError) throw error(status, noteError)

  return {
    note: data,
  }
}