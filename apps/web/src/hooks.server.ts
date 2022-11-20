import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import '$lib/supabase'
import type { Handle, HandleServerError } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve}) => {
  const { session, supabaseClient } = await getSupabase(event)
  if (!session) return resolve(event)

  const { data } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  event.locals.profile = data
  return resolve(event)
}

export const handleError: HandleServerError = ({ error }) => {
  return {
    message: (error as any).message ?? '',
  } 
}