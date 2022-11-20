import type { RequestEvent } from '@sveltejs/kit'
import type { ActionResult } from '../../types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { invalid } from '@sveltejs/kit'

const changeSite = (text: string, site: string): string => {
  const lines = text.split('\n')
  const paramsIdx = lines.findIndex((it) => it.startsWith('# site'))
  lines[paramsIdx] = `# site        = ${site}`

  return lines.join('\n')
}

export const editSite = async (event: RequestEvent, message: string): ActionResult => {
  const { supabaseClient, session } = await getSupabase(event)
  if (!event.locals.profile || !session?.user) return invalid(401, {
    cmdValue: message, 
    cmdError: 'Session not founded, try clear cookie' 
  })
  
  const url = event.locals.profile.url
  const [, site] = message.split(' ')
  
  if (!site?.length) return invalid(500, {
    cmdValue: message,
    cmdError: 'Wrong command, a description is not parsed'
  })
  
  const { data } = await supabaseClient.storage.from('users')
    .download(url)
  if (!data) return invalid(401, {
    cmdValue: message, 
    cmdError: `${url} not founded` 
  })

  const text = await data.text()
  const next = changeSite(text, site)
  const file = new Blob([next], { type: "text/plain;charset=utf-8" })

  
  const { error } = await supabaseClient.storage.from('users').update(url, file)
  console.log('editDesc', next)
  
  if (error) return invalid(500, { 
    cmdValue: message,
    cmdError: error.message 
  })

  return { cmdValue: '' }
}