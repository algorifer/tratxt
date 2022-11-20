import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { redirect, invalid } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'
import type { ActionResult } from '../types'
import { userMetaTemplate } from './userMetaTemplate'

export const init = async (event: RequestEvent): ActionResult => {
  const { supabaseClient, session } = await getSupabase(event)
  if (!session) return invalid(401, { initError: 'Session not founded, try clear cookie' })

  const formData = await event.request.formData()
  const name = formData.get('name')?.toString()

  if (!name) return invalid(400, { initError: 'Name is required' })
  if (!/((\s|^)[a-zA-Z0-9_])/g.test(name)) return invalid(400, { initError: 'Available only A-Z, a-z, 0-9 and _ symbols'})

  const file = new Blob([userMetaTemplate(name)], { type: "text/plain;charset=utf-8" })
  const { data, error } = await supabaseClient.storage.from('users').upload(`${name}/tratxt.txt`, file)
  if (error) return invalid(500, { initError: error.message })

  await supabaseClient.from('profiles').insert({
    id: session.user.id,
    name,
    url: data.path,
  })

  throw redirect(302, `/${name}`)
}