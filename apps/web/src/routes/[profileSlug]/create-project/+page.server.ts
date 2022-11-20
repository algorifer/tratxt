import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import type { Actions } from './$types'
import { ProjectRole, EventType } from '$lib/database'
import { invalid, redirect } from '@sveltejs/kit'

export const actions: Actions = {
  create: async (event) => {
    const { session, supabaseClient } = await getSupabase(event)

    if (!session) throw redirect(303, '/auth') 

    const formData = await event.request.formData()
    const values = {
      slug: formData.get('slug')?.toString(),
      website: formData.get('website')?.toString(),
      description: formData.get('description')?.toString(),
      readme: formData.get('readme')?.toString()
    }

    if (!values.slug) return invalid(400, { values, error: 'Name is required' })
    
    const { data: author } = await supabaseClient
      .from('authors')
      .select('id, slug, is_team')
      .eq('slug', event.params.authorSlug)
      .limit(1)
      .single()
    if (!author) return invalid(400, { values, error: 'Author not founded' })

    const projects = await supabaseClient
      .from('projects')
      .select('slug')
      .eq('author', author.id)

    if (projects.data?.find(({slug}) => slug === values.slug)) {
      return invalid(400, { values, error: 'This name already use' })
    }

    const { data: project, status, error: projectError } = await supabaseClient
      .from('projects')
      .upsert({
        ...values,
        slug: values.slug,
        author: author.id,  
      })
      .select('id, slug, author!inner (id, slug)')
      .single()

    if (projectError) return invalid(status, { values, error: projectError.message })

    await supabaseClient.from('person_project')
      .insert({
        person: session.user.id,
        project: project.id,
        role: ProjectRole.Admin,
      })

    await supabaseClient.from('events')
      .insert({
        author: session.user.id,
        type: EventType.CreateProject,
        project: project.id,
        team: author.is_team ? author.id : undefined,
      })


    throw redirect(200, `/${event.params.authorSlug}/${project.slug}`)
  },
}