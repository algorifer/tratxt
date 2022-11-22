import type { RequestEvent } from '@sveltejs/kit'
import type { ActionResult } from '../../types'
import { redirect } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { invalid } from '@sveltejs/kit'

export const editName = async (event: RequestEvent, message: string): ActionResult => {
  const { supabaseClient } = await getSupabase(event)

  const userId = event.locals.profile?.id
  const prevName = event.locals.profile?.name

  if (!userId || !prevName) return invalid(401, {
    cmdValue: message, 
    cmdError: 'Session not founded, try clear cookie' 
  })
  
  const [, name] = message.split(' ')
  if (!name?.length) return invalid(500, {
    cmdValue: message,
    cmdError: 'Wrong command, a name is not parsed'
  })
  
  const { data: checkName } = await supabaseClient.from('profiles').select('name').eq('name', name).single()
  if (checkName) return invalid(500, {
    cmdValue: message,
    cmdError: `Name ${name} not available`,
  })

  const { error: profileError } = await supabaseClient.from('profiles').update({name}).eq('id', userId)
  const { error: recordsError } = await supabaseClient.from('records').update({ author: name }).eq('author', prevName) 

  if (profileError || recordsError) return invalid(500, { 
    cmdValue: message,
    cmdError: profileError?.message ?? recordsError?.message 
  })

  throw redirect(302, `/${name}`)
}