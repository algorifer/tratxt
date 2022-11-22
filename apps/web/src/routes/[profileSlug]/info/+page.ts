import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import type { PageLoad } from './$types'

export const load: PageLoad = async (event) => {
  const { session, supabaseClient } = await getSupabase(event)
}