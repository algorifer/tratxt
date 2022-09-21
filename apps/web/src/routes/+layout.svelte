<script lang="ts">
  import 'normalize.css/normalize.css'
  import { goto, invalidateAll } from '$app/navigation'

  import type { LayoutData } from './$types'
  import { supabaseClient } from '$lib/supabase'
  import { handleSession } from '$lib/session'
  import { theme } from '$lib/stores'
  import MainHeader from '$lib/components/MainHeader.svelte'
  import CreateUser from '$lib/components/CreateUser.svelte'

  export let data: LayoutData | null

  $: session = data?.user ?? null

  supabaseClient.auth.onAuthStateChange(async (event, sesh) => {
    const sessionResponse = await handleSession(event, sesh)

    if (typeof sessionResponse.url === 'string' && sesh?.user) {
      await invalidateAll()
      if (event === 'SIGNED_OUT') session = null
      if (event === 'SIGNED_IN') session = sesh.user
      goto(sessionResponse.url)
    }
  })
</script>

<main style={`--c-front: ${$theme.front}; --c-back: ${$theme.back}`}>
  <MainHeader user={session} />
  <div>
    {#if session !== null}
      <slot />
    {:else}
      <CreateUser />
    {/if}
  </div>
</main>

<style>
  main {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    padding: 1.5rem;
    background: var(--c-back);
    color: var(--c-front);
  }
</style>
