import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import type { PageLoad } from './$types'

export const load: PageLoad = async (event) => {
  const { supabaseClient } = await getSupabase(event)
  const parent = await event.parent()

  const { data: channels } = await supabaseClient
    .from('channels')
    .select('id, name, description')
    .eq('profile', parent.profile.id)
  
  const { data: projects } = await supabaseClient
    .from('projects_txt')
    .select('id, slug, description, author_id, author_slug')
    .eq('author_id', parent.profile.id)

  const { data: teams } = await supabaseClient
    .from('profile_teams')
    .select('team_id, team_slug, team_description')
    .eq('person', parent.profile.id)
  
  const { data: members } = await supabaseClient
    .from('team_members')
    .select('member_id, member_slug, role')
    .eq('team', parent.profile.id)

  return {
    channels: channels ?? [],
    projects: projects ?? [],
    teams: teams ?? [],
    members: members ?? [],
  }
}