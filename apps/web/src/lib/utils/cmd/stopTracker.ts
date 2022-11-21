import { DateTime } from 'luxon'
import type { RequestEvent } from '@sveltejs/kit'
import type { ActionResult } from '../../types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { invalid } from '@sveltejs/kit'
import { insertRecordRow } from './insertRecordRow'

const reTime = /(^|\s)(;[\d]+)/ig

export const stopTracker = async (event: RequestEvent, message: string): ActionResult => {
  const { supabaseClient } = await getSupabase(event)
  const profile = event.locals.profile
  if (!profile) return invalid(401, {
    cmdValue: message, 
    cmdError: 'Session not founded, try clear cookie' 
  })

  const { data: tracker } = await supabaseClient
    .from('current_times')
    .select('start')
    .eq('author', profile.id)
    .single()
  if (!tracker) return invalid(500, ({
    cmdValue: message,
    cmdError: 'Started tracker not found'
  }))

  await supabaseClient.from('current_times').delete().eq('author', profile.id)

  const { data } = await supabaseClient.storage.from('users')
    .download(profile.url)
  if (!data) return invalid(401, {
    cmdValue: message, 
    cmdError: `${profile.url} not founded` 
  })

  const [, ...payload] = message.split(' ')
  const duration = DateTime.now().diff(DateTime.fromISO(tracker.start), ['minutes', 'seconds'])
  const record = `${payload.join(' ').replaceAll(reTime, '')} ;${duration.minutes}`

  const text = await data.text()
  const next = insertRecordRow(text, record)
  const file = new Blob([next], { type: "text/plain;charset=utf-8" })

  const { error } = await supabaseClient.storage.from('users')
    .update(profile.url, file)

  if (error) return invalid(500, { 
    cmdValue: record,
    cmdError: 'Not saved, try post this'
  })

  return { cmdValue: '' }
}