import { error } from '@sveltejs/kit'
import type { AuthChangeEvent, Session } from '@supabase/supabase-js'

export const handleSession = async (event: AuthChangeEvent, session: Session | null) => {
  switch (event) {
    case 'SIGNED_OUT':
      try {
        await fetch('/api/cookie', {
          method: 'DELETE',
          credentials: 'same-origin',
        })
      } catch (err) {
        throw error(500, {
          message: (err as any)?.message ?? '',
        })
      }
      return { url: '/' }
    case 'SIGNED_IN':
      try {
        await fetch('/api/cookie', {
          method: 'POST',
          credentials: 'same-origin',
          body: JSON.stringify(session)
        })
      } catch (err) {
        throw error(500, {
          message: (err as any)?.message ?? '',
        })
      }
      return { url: '/' }
    case 'TOKEN_REFRESHED':
      try {
        await fetch('/api/cookie', {
          method: 'POST',
          credentials: 'same-origin',
          body: JSON.stringify(session)
        })
      } catch (err) {
        throw error(500, {
          message: (err as any)?.message ?? '',
        })
      }
      return { url: false }
    default:
      return { url: false }
  }
}