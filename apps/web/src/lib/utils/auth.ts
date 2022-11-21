import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { redirect, invalid } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'
import { dev } from '$app/environment'
import type { ActionResult } from '../types'

export const email = async (event: RequestEvent): ActionResult => {
  const { supabaseClient } = await getSupabase(event)
  const formData = await event.request.formData()
  const email = formData.get('email')?.toString()

  if (!email) {
    return invalid(400, { authError: 'Email is required' })
  }

  const { error } = await supabaseClient.auth.signInWithOtp({ 
    email, 
    options: {
      emailRedirectTo: dev ? 'http://localhost:3000' : undefined 
    } 
  })
  
  if (error) {
    return invalid(500, {
      authError: 'Server error. Try again later.',
    })
  }

  return { authSuccess: true }
}

export const github = async (event: RequestEvent): ActionResult => {
  const { supabaseClient } = await getSupabase(event)

  const { data, error } = await supabaseClient.auth.signInWithOAuth({ 
    provider: 'github', 
    options: {
      redirectTo: dev ? 'http://localhost:3000' : undefined 
    }
  })
    
  if (error) {
    return invalid(500, {
      authError: 'Server error. Try again later.',
    })
  }

  throw redirect(303, data.url)
}