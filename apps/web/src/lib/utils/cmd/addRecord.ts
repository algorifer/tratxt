import type { RequestEvent } from '@sveltejs/kit'
import type { ActionResult } from '../../types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { invalid } from '@sveltejs/kit'
import { insertRecordRow } from './insertRecordRow'

export const addRecord = async (event: RequestEvent, message: string): ActionResult => {
  const { supabaseClient } = await getSupabase(event)
  const url = event.locals.profile?.url
  if (!url) return invalid(401, {
    cmdValue: message, 
    cmdError: 'Session not founded, try clear cookie' 
  })

  const { data } = await supabaseClient.storage.from('users')
    .download(url)
  if (!data) return invalid(401, {
    cmdValue: message, 
    cmdError: `${url} not founded` 
  })

  const text = await data.text()
  const next = insertRecordRow(text, message)
  const file = new Blob([next], { type: "text/plain;charset=utf-8" })

  const { error } = await supabaseClient.storage.from('users')
    .update(url, file)

  if (error) return invalid(500, { 
    cmdValue: message,
    cmdError: 'Not saved' 
  })

  return { cmdValue: '' }
}