<script lang="ts">
  import 'normalize.css/normalize.css'

  import { user, theme } from '$lib/stores'
  import MainHeader from '$lib/components/MainHeader.svelte'
  import CreateUser from '$lib/components/CreateUser.svelte'
</script>

<main style={`--c-front: ${$theme.front}; --c-back: ${$theme.back}`}>
  <MainHeader />
  <div>
    {#if $user}
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
