import type { RequestEvent } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { parseRecord } from 'tratxt'
import type { ActionResult } from '../../types'
import { invalid } from '@sveltejs/kit'

export const addRecord = async (event: RequestEvent, message: string): ActionResult => {
  const { supabaseClient } = await getSupabase(event)
  
  const profile = event.locals.profile
  if (!profile) return invalid(401, {
    cmdValue: message, 
    cmdError: 'Session not founded, try clear cookie' 
  })
  
  const record = parseRecord(profile.name, message)

  const { error } = await supabaseClient.from('records').insert({
    ...record,
    project: record.project || undefined,
    channel: record.channel || undefined,
    mood: record.mood || undefined,
  })
  
  if (error) return invalid(500, { 
    cmdValue: message,
    cmdError: error.message 
  })

  return { cmdValue: '' }
}