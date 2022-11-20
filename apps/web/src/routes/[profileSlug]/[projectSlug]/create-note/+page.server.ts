import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { error, invalid, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import { EventType } from '$lib/database'
import { normalizeArray } from '$lib/utils/normalizeArray'

export const actions: Actions = {
  create: async (event) => {
    const { session, supabaseClient } = await getSupabase(event);

    if (!session?.user) {
      throw error(403, { message: 'Unauthorized' });
    }

    const formData = await event.request.formData()
    const values = {
      title: formData.get('title')?.toString(),
      content: formData.get('content')?.toString(),
    }

    // Validate form
    if (!values.title?.length) return invalid(403, { values, error: 'Title is required' })
    if (!values.content?.length) return invalid(403, { values, error: 'Content is required' })

    // Get project info
    const { data: project } = await supabaseClient
      .from('projects')
      .select('id, author (id, slug, is_team)')
      .eq('slug', event.params.projectSlug)
      .limit(1)
      .single()  
    const projectAuthor = normalizeArray(project?.author)
    if (!project || !projectAuthor) throw error(404, 'Project not founded') 
  
    // Get prev note number
    const { data: lastNote } = await supabaseClient
      .from('notes')
      .select('id, link_id')
      .eq('project', project.id)
      .order('link_id', { ascending: false })
      .single()

    // Create note
    const { data: note, error: noteError, status } = await supabaseClient
      .from('notes')
      .upsert({
        title: values.title,
        content: values.content,
        author: session.user.id,
        project: project.id,
        done: false,
        link_id: lastNote?.link_id ? lastNote.link_id + 1 : 1,
      })
      .select('id, link_id')
      .single()

    if (noteError) return invalid(status, { form: values, error: noteError.message })

    // Create event
    await supabaseClient
      .from('events')
      .insert({
        author: session.user.id,
        type: EventType.CreateNote,
        note: note.id,
        project: project.id,
        team: projectAuthor.is_team ? projectAuthor.id as string : undefined,
      })

    redirect(status, `/${event.params.authorSlug}/${event.params.projectSlug}/${note.link_id}`)
  }
}