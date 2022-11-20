import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { redirect, error } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { ProjectRole } from '$lib/database'
import { getProjectRole } from '$lib/utils/getProjectRole'

const accessError = `You can't create notes in this project`

export let load: PageLoad = async (event) => {
  const { session, supabaseClient } = await getSupabase(event)

  if (!session?.user) throw redirect(303, '/auth')

  const { data: project, error: projectError, status } = await supabaseClient
    .from('projects')
    .select('id')
    .eq('slug', event.params.projectSlug)
    .single()

  if (!project) throw error(404, 'Project not founded')

  const role = await getProjectRole(supabaseClient, project.id, session.user.id)

  if (role === ProjectRole.Everyone) throw error (403, accessError)

  return {
    project,
  }
}