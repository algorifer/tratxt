import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { error, redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async (event) => {
  const { session } = await getSupabase(event)
  const parent = await event.parent()

  if (!session || !parent.userSlug) throw redirect(303, '/auth')
  if (parent.userSlug !== event.params.profileSlug) throw redirect(303, `/${parent.userSlug}/create-team`)

  return {
    user: parent.session.user,
  }
}