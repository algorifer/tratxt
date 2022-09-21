/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  interface UserSession {
    user: import('@supabase/supabase-js').User & Record<string, any>
    accessToken?: string
  }
  
  interface Locals extends UserSession {
    error: import('@supabase/supabase-js').ApiError
  }
  
  interface Session extends UserSession {}
  // interface Locals {}
  // interface Platform {}
  // interface Session {}
  // interface Stuff {}
}
