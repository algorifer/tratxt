import type { RequestEvent } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import type { ActionResult } from '../../types'
import { invalid, redirect } from '@sveltejs/kit'

export const addDoc = async (event: RequestEvent, message: string): ActionResult => {
  const profile = event.locals.profile

  if (!profile) return invalid(401, {
    cmdValue: message, 
    cmdError: 'Session not founded, try clear cookie' 
  })

  const [command, ...payload] = message.replaceAll('\r', '\n').split('\n')
  const [, name, operator, ...parentList] = command.split(' ')
  
  if (!name) return invalid(501, { cmdValue: message, cmdError: `Doc's name not founded` })
  
  const parents = operator === '>'
    ? parentList.filter((it) => Boolean(it))
    : ['README']

  const body = payload.filter((it) => Boolean(it)).join('\n')
  
  const { supabaseClient } = await getSupabase(event)
  const { error, status } = await supabaseClient
    .from('docs')
    .upsert({
      author: profile.name,
      name,
      body,
      parents: name === 'README' ? [] : parents,
    })

  if (error) return invalid(status, {
    cmdValue: message,
    cmdError: error.message,
  })

  throw redirect(302, `/${profile.name}/${name}`)
}