import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import type { PageLoad } from './$types'
import { getProjectEvents } from '$lib/utils/getTrates'
import { normalizeArray } from '$lib/utils/normalizeArray'

export const load: PageLoad = async (event) => {
  const { supabaseClient } = await getSupabase(event)
  const data = await event.parent()

  const events = await getProjectEvents(supabaseClient, data.project.id, 3)

  const members = await supabaseClient
    .from('person_project')
    .select('*, person (id, slug)')
    .eq('project', data.project.id)

  return {
    ...data,
    events: events.data,
    members: members.data?.map((it) => {
      const person = normalizeArray(it.person)

      return {
        id: person?.id as string,
        slug: person?.slug as string,
        projectRole: it.role,
      }
    }).filter((it) => it !== null) ?? []
  }
} 