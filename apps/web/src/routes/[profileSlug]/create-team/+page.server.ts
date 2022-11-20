import { redirect, invalid } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import type { Actions } from './$types' 
import { ProfileRole } from '$lib/database'

export const actions: Actions = {
  create: async (event) => {
    const { session, supabaseClient } = await getSupabase(event)
    if (!session?.user.id) throw redirect(303, '/auth')

    const formData = await event.request.formData()
    const values = {
      slug: formData.get('slug')?.toString(),
      description: formData.get('description')?.toString(),
      readme: formData.get('readme')?.toString(),
      website: formData.get('website')?.toString(),
      is_team: true,
      updated_at: new Date().toISOString()
    }

    if (!values.slug?.length) return invalid(500, { values, error: 'Name is required' })

    const { data, error: createError } = await supabaseClient
      .from('profiles')
      .insert({
        ...values,
        slug: values.slug,
      })
      .select('id, slug')
      .single()

    if (createError) return invalid(500, { values, error: createError.message })

    await supabaseClient.from('person_team')
      .insert({
        person: session.user.id,
        team: data.id,
        role: ProfileRole.Owner,
      })

    await supabaseClient.from('trates')
      .insert({
        body: 'Created team',
        author: session.user.id,
        team: data.id,
      })

    throw redirect(300, `/${data.slug}`)
  }
}