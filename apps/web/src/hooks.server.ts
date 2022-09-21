import type { HandleServerError, Handle } from '@sveltejs/kit'
import { supabaseServerClient } from '$lib/supabase'

export const handle: Handle = async ({ event, resolve }) => {
  const tokens = event.cookies.get('tokens') ? JSON.parse(event.cookies.get('tokens') ?? '') : null
  const user = event.cookies.get('user') ? JSON.parse(event.cookies.get('user') ?? '') : null

  if (tokens) {
    supabaseServerClient.auth.setSession(tokens.access_token)
  }

  event.locals.user = user

  const response = await resolve(event)
  return response
}

export const handleError: HandleServerError = ({ error }) => {
  return {
    message: (error as any).message ?? '',
  } 
}