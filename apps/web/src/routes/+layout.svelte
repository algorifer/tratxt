<script lang="ts">
  import 'normalize.css/normalize.css'
  import './global.css'
  import { onMount } from 'svelte'
  import { invalidate } from '$app/navigation'
  import { navigating } from '$app/stores'

  import { supabase } from '$lib/supabase'

  onMount(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(() => {
      invalidate('supabase:auth')
    })

    return () => {
      subscription.unsubscribe()
    }
  })
</script>

<div class:navigate={$navigating && $navigating.to}>
  <slot />
</div>

<style>
  .navigate {
    opacity: 0.6;
    transition: 0.2s ease-in-out opacity;
  }
</style>
