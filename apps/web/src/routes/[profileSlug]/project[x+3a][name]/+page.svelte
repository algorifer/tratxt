<script lang="ts">
  import type { PageData, ActionData } from './$types'
  import { getControlParams } from '$lib/utils/getControlParams'
  import MainControl from '$lib/components/MainControl.svelte'
  import RecordsList from '$lib/components/RecordsList.svelte'
  import DocCard from '$lib/components/DocCard.svelte'

  export let data: PageData
  export let form: ActionData

  $: params = getControlParams(data, form)
</script>

<main>
  <RecordsList records={data.records}>
    {#if data.doc}
      <DocCard author={data.profile.name} doc={data.doc} />
    {/if}
  </RecordsList>
</main>
<MainControl {params} --area="cmd" />

<style>
  main {
    margin: 2rem 1rem auto;
    flex-grow: 2;
  }

  @media (min-width: 800px) {
    main {
      margin: 2rem 2rem auto;
    }
  }
</style>
