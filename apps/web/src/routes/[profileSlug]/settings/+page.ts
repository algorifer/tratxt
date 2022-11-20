import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { error, redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { ProfileRole } from '$lib/database'

export const load: PageLoad = async (event) => {
  const { session, supabaseClient } = await getSupabase(event)
  const { profile } = await event.parent()

  if (!session?.user?.id) throw redirect(303, '/auth')
  if (!profile) throw error(404, 'Not founded')

  let owner = session?.user.id === profile.id

  if (profile.is_team) {
    const { data: personTeam } = await supabaseClient
      .from('person_team')
      .select('role')
      .eq('person', session?.user.id)
      .eq('team', profile.id)
      .single()
      
    owner = personTeam?.role === ProfileRole.Owner
  }
  
  if (!owner) throw redirect(301, `/${event.params.profileSlug}`)

  return { profile }
}
