import { DateTime } from 'luxon'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import type { PageLoad } from './$types'
import { getDatedTable } from '$lib/utils/tratxt/getStatTable'
import { getParam, getYears, getMonths } from '$lib/utils/tratxt/getParam'
import { getCalendar } from '$lib/utils/tratxt/getCalendar'

export const load: PageLoad = async (event) => {
  const { supabaseClient } = await getSupabase(event)

  const projectFilter = event.url.searchParams.get('project')
  const channelFilter = event.url.searchParams.get('channel')
  const tagFilter = event.url.searchParams.get('tag')
  const moodFilter = event.url.searchParams.get('mood')
  const yearFilter = event.url.searchParams.get('year')
  const monthFilter = event.url.searchParams.get('month')

  const year = yearFilter 
    ? DateTime.fromFormat(`${monthFilter ?? 'January'} ${yearFilter} 01`, 'LLLL yyyy dd', {locale: 'en'})
    : null

  let query = supabaseClient
    .from('records')
    .select('hash, date, channel, project, mood, time, tags')
    .eq('author', event.params.profileSlug)

  if (projectFilter) query = query.eq('project', projectFilter)
  if (channelFilter) query = query.eq('channel', channelFilter)
  if (tagFilter) query = query.contains('tags', [tagFilter])
  if (moodFilter) query = query.eq('mood', moodFilter)
  if (year) query = query
    .gte('date', year.toSQLDate())
    .lt('date', year.plus(monthFilter ? { month: 1 } : { year: 1 }).toSQLDate())

  const { data: records, error } = await query.order('date', { ascending: false })

  console.log(error, year?.toSQLDate())

  const table = getDatedTable(records ?? [])
  const allCount = table.hash.length
  const allTime = table.time.reduce((acc, it) => (acc + it), 0)
  
  const projects = getParam(table, allTime, 'project')
  const channels = getParam(table, allTime, 'channel')
  const tags = getParam(table, allTime, 'tags')
  const moods = getParam(table, allTime, 'mood')
  const years = getYears(table, allTime)
  const months = getMonths(table, allTime)

  const calendar = getCalendar(
    table,
    year ? year.year : undefined,
    monthFilter && year ? year.month : undefined 
  )

  const { data: docs } = await supabaseClient
    .from('docs')
    .select('name, body')
    .eq('author', event.params.profileSlug)
    .in('name', projects.map(({ name }) => name))


  return {
    calendar,
    channels,
    projects,
    tags,
    moods,
    years,
    months,
    docs: docs ?? [],
    allCount,
    allTime,
  }
}