import type { RequestEvent } from '@sveltejs/kit'
import type { ActionResult } from '../../types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { invalid } from '@sveltejs/kit'

export const startTracker = async (event: RequestEvent, message: string): ActionResult => {
  const { supabaseClient, session } = await getSupabase(event)
  if (!session?.user) return invalid(401, {
    cmdValue: message, 
    cmdError: 'Session not founded, try clear cookie' 
  })

  const { data } = await supabaseClient
    .from('current_times')
    .select('start')
    .eq('author', session.user.id)
    .single()

  if (data) return invalid(400, {
    cmdValue: message,
    cmdError: 'Tracker already started'
  })

  const { error } = await supabaseClient
    .from('current_times')
    .insert({ author: session.user.id })

  if (error) return invalid(400, {
    cmdValue: message,
    cmdError: error.message,
  })

  return { cmdValue: '' }
}