import { error, redirect } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import type { PageLoad } from './$types'
import { ProfileRole } from '$lib/database'
import { getProfileRole } from '$lib/utils/getProfileRole'

const noRightMessage = `You don't have right for creating project for this profile`
const notFounded = 'Profile not founded'

export const load: PageLoad = async (event) => {
  const { session, supabaseClient } = await getSupabase(event)
  if (!session) throw redirect(303, '/auth')

  const { data: author } = await supabaseClient
    .from('profiles')
    .select('id, slug, is_team')
    .eq('slug', event.params.profileSlug)
    .limit(1)
    .single()

  if (!author) throw error(404, { message: notFounded })

  const role = await getProfileRole(supabaseClient, author, session.user.id)
  if (role !== ProfileRole.Owner) throw error(403, {message: noRightMessage})

  const projects = await supabaseClient
    .from('projects')
    .select('id, slug, author')
    .eq('author', author.id)

  return {
    author,
    names: projects.data?.map(({ slug }) => slug) ?? [],
  }
}
