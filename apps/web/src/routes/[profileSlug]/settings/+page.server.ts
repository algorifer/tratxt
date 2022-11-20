import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { redirect, invalid } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
  update: async (event) => {
    const { session, supabaseClient } = await getSupabase(event)

    if (!session) throw redirect(303, '/auth')
    
    const formData = await event.request.formData()

    const values = {
      description: formData.get('description')?.toString(),
      readme: formData.get('readme')?.toString(),
      website: formData.get('website')?.toString(),
      updated_at: new Date().toISOString()
    }
  
    const res = await supabaseClient
      .from('profiles')
      .update(values)
      .eq('slug', event.params.profileSlug)
      .single()

    if (res.error) return invalid(400, { values, error: res.error.message })

    return { author: res.data ?? values, success: true }
  }
}
