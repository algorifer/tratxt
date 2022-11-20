import type { RequestEvent } from '@sveltejs/kit'
import type { ActionResult } from '../../types'
import { redirect } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { invalid } from '@sveltejs/kit'

const changeName = (text: string, name: string): string => {
  const lines = text.split('\n')
  const paramsIdx = lines.findIndex((it) => it.startsWith('# name = '))
  lines[paramsIdx] = `# name = ${name}`

  return lines.join('\n')
}

export const editName = async (event: RequestEvent, message: string): ActionResult => {
  const { supabaseClient, session } = await getSupabase(event)
  if (!event.locals.profile || !session?.user) return invalid(401, {
    cmdValue: message, 
    cmdError: 'Session not founded, try clear cookie' 
  })
  
  const url = event.locals.profile.url
  const [, name] = message.split(' ')
  if (!name?.length) return invalid(500, {
    cmdValue: message,
    cmdError: 'Wrong command, a name is not parsed'
  })
  
  const { data: checkName } = await supabaseClient.from('profiles').select('name').eq('name', name).single()
  console.log('edit', checkName)

  if (checkName) return invalid(500, {
    cmdValue: message,
    cmdError: `Name ${name} not available`,
  })

  const { data } = await supabaseClient.storage.from('users')
    .download(url)
  if (!data) return invalid(401, {
    cmdValue: message, 
    cmdError: `${url} not founded` 
  })

  const text = await data.text()
  const next = changeName(text, name)
  const file = new Blob([next], { type: "text/plain;charset=utf-8" })
  const newUrl = `${name}/tratxt.txt`

  const { error: moveError } = await supabaseClient.storage.from('users').move(url, newUrl)
  const { error: updateError } = await supabaseClient.storage.from('users').update(newUrl, file)

  if (moveError || updateError) return invalid(500, { 
    cmdValue: message,
    cmdError: 'Not saved' 
  })

  await supabaseClient.from('profiles').update({ name, url: `${name}/tratxt.txt` }).eq('id', session.user.id)
  throw redirect(302, `/${name}`)
}