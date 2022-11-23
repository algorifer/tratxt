<script lang="ts">
  import type { PageData, ActionData } from './$types'
  import { getControlParams } from '$lib/utils/getControlParams'
  import MainControl from '$lib/components/MainControl.svelte'
  import Trate from '$lib/components/Trate.svelte'

  export let data: PageData
  export let form: ActionData

  $: params = getControlParams(data, form)
</script>

<main>
  <ul>
    {#if !data.records?.length}
      <li>Trates not founded</li>
    {/if}
    {#each data.records as trate, i (trate.date)}
      <li>
        <Trate {trate} />
      </li>
    {/each}
  </ul>
</main>
<MainControl {params} --area="cmd" />

<style>
  main {
    margin: 2rem 1rem auto;
    flex-grow: 2;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    flex-direction: column;
    gap: 2rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  @media (min-width: 800px) {
    main {
      margin: 2rem 2rem auto;
    }
  }
</style>
