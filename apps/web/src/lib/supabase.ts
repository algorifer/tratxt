import type {Provider} from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'

export const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
export const supabaseServerClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)

export const signIn = async (provider: Provider) => {
  try {
    /*
    ** if logging in on a page other than `/`:
    ** to prevent a flash of content after login,
    ** set redirectTo equal to your app's login page
    */
    const { error } = await supabaseClient.auth.signIn({ provider }, { redirectTo: 'http://localhost:3000/' })
    if (error) console.error(error)
  } catch (error) {
    console.error(error)
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabaseClient.auth.signOut()
    if (error) console.error(error)
  } catch (error) {
    console.error(error)
  }
}