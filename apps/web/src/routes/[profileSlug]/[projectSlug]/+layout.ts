import { error } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import type { LayoutLoad } from './$types'
import { getProjectRole } from '$lib/utils/getProjectRole'

export const load: LayoutLoad = async (event) => {
  const { session, supabaseClient } = await getSupabase(event)

  const { data } = await supabaseClient
    .from('projects')
    .select('id, slug, description, website, readme, author!inner (id, slug, is_team)')
    .eq('author.slug', event.params.authorSlug)
    .eq('slug', event.params.projectSlug)
    .limit(1)
    .single()

  if (!data) throw error(404, 'Project not founded')

  const role = await getProjectRole(supabaseClient, data.id, session?.user.id)

  const project = {
    ...data,
    author: Array.isArray(data.author) ? data.author[0] : data.author,
  }

  return {
    project,
    role
  }
}