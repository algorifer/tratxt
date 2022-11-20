import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { error, redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async (event) => {
  const { session } = await getSupabase(event)
  const { project } = await event.parent()

  if (!session?.user?.id) throw redirect(303, '/auth')
  if (!project) throw error(404, 'Not founded')

  return { project }
}
