import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export let load: PageLoad = async (event) => {
  const { supabaseClient } = await getSupabase(event)

  const { data: doc } = await supabaseClient
    .from('docs')
    .select('*')
    .eq('author', event.params.profileSlug)
    .eq('name', event.params.doc)
    .single()

  if (!doc) throw error(404, { message: 'Doc not found' })
    
  const { data: children } = await supabaseClient
    .from('docs')
    .select('name')
    .eq('author', event.params.profileSlug)
    .contains('parents', [event.params.doc])

  const { data: brothers } = await supabaseClient
    .from('docs')
    .select('name')
    .eq('author', event.params.profileSlug)
    .contains('parents', [doc.parents[0]] ?? [])

  const { data: records } = await supabaseClient
    .from('records')
    .select('*')
    .eq('author', event.params.profileSlug)
    .eq('project', event.params.doc)
    .order('date', { ascending: false })

  return {
    doc,
    parents: doc.parents,
    brothers: doc.name === 'README' ? ['README'] : brothers?.map(({ name }) => name) ?? [],
    children: children?.map(({ name }) => name) ?? [],
    records: records || [],
  }
}