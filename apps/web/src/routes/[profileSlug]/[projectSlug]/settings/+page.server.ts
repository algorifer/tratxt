import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { redirect, invalid } from '@sveltejs/kit'
import type { Actions } from './$types'
import type { Database } from '$lib/database'

export const actions: Actions = {
  update: async (event) => {
    const { session, supabaseClient } = await getSupabase(event)

    if (!session) throw redirect(303, '/auth')
    
    const formData = await event.request.formData()

    const project: Database['public']['Tables']['projects']['Update'] = {
      description: formData.get('description')?.toString(),
      readme: formData.get('readme')?.toString(),
      website: formData.get('website')?.toString(),
      updated_at: new Date().toISOString()
    }
  
    const res = await supabaseClient
      .from('projects')
      .update(project)
      .eq('slug', event.params.projectSlug)
      .single()

    if (res.error) return invalid(400, { project, error: res.error.message })

    return { author: res.data ?? project, success: true }
  }
}
