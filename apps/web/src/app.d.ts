/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface UserSession {
  //   user: import('@supabase/supabase-js').User & Record<string, any>
  // }

  interface Supabase {
    Database: import('./lib/database').Database;
    SchemaName: 'public';
  }
  
  // interface Locals extends UserSession {
  //   error: import('@supabase/supabase-js').ApiError
  // }
  
  // interface Session extends UserSession {}
  interface Locals {
    profile?: import('./lib/database').Database['public']['Tables']['profiles']['Row'] | null
  }
  interface PageData {
    userId?: string
    userName?: string
  }
  // interface Platform {}
  // interface Session {}
  // interface Stuff {}
}
