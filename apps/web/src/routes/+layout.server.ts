import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async (event) => {
  const { session, supabaseClient } = await getSupabase(event)

  const userId = session?.user.id

  if (!session?.user) return { userId }

  const { data } = await supabaseClient
    .from('profiles')
    .select('id, name')
    .eq('id', userId)
    .single()

  return {
    userId,
    userName: data?.name,
  }
}