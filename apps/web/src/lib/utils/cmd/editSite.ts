import type { RequestEvent } from '@sveltejs/kit'
import type { ActionResult } from '../../types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { invalid } from '@sveltejs/kit'

export const editSite = async (event: RequestEvent, message: string): ActionResult => {
  const { supabaseClient } = await getSupabase(event)

  const userId = event.locals.profile?.id

  if (!userId) return invalid(401, {
    cmdValue: message, 
    cmdError: 'Session not founded, try clear cookie' 
  })
  
  const [, site] = message.split(' ')
  if (!site?.length) return invalid(500, {
    cmdValue: message,
    cmdError: 'Wrong command, a description is not parsed'
  })

  const { error } = await supabaseClient.from('profiles').update({ site }).eq('id', userId)
  
  if (error) return invalid(500, { 
    cmdValue: message,
    cmdError: error.message 
  })

  return { cmdValue: '' }
}