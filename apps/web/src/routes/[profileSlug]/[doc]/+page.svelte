<script lang="ts">
  import type { PageData, ActionData } from './$types'
  import { getControlParams } from '$lib/utils/getControlParams'
  import MainControl from '$lib/components/MainControl.svelte'
  import RecordsList from '$lib/components/RecordsList.svelte'
  import DocsNav from '$lib/components/DocsNav.svelte'

  export let data: PageData
  export let form: ActionData
</script>

<main>
  {#if data.map}
    <DocsNav author={data.profile.name} map={data.map} --area="docs" />
  {/if}
  <section>
    {data.doc.body}
  </section>
  <RecordsList records={data.records} count={data.count} size={data.pageSize} --area="lists" />
</main>

<MainControl params={getControlParams(data, form)} />

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    flex-grow: 2;
    margin: 2rem 1rem auto;
  }

  @media (min-width: 800px) {
    main {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: auto 1fr;
      grid-template-areas:
        'docs  body'
        'lists body';
      gap: 2rem;
      align-items: start;
      align-content: start;
      margin: 2rem 2rem auto;
    }

    section {
      grid-area: body;
    }
  }
</style>
