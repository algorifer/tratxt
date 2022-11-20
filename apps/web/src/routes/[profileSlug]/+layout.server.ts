import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { parseTxt, createTable, getAllTime, getParamEntities } from 'tratxt'
import { error } from '@sveltejs/kit'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async (event) => {
  try {
    const { supabaseClient } = await getSupabase(event)
  
    const { data } = await supabaseClient.storage.from('users')
      .download(`${event.params.profileSlug}/tratxt.txt`)
  
    if (!data) throw error(404, { message: 'Tratxt not funded' })
    const txt = await data.text()
    
    const parsed = parseTxt(txt)
    const table = createTable(parsed.records)
    const allTime = getAllTime(table)
    const projects = getParamEntities(table, 'projects')
    const channels = getParamEntities(table, 'channels')
    const tags = getParamEntities(table, 'tags')
    const moods = getParamEntities(table, 'moods')
  
    return {
      meta: parsed.meta,
      records: parsed.records,
      allTime,
      projects,
      channels,
      tags,
      moods,
    }
  } catch (e) {
    throw error(500, {message: `Layout error: ${e}`})
  }
}