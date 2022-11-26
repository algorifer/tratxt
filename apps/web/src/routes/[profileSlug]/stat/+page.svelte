<script lang="ts">
  import type { PageData } from './$types'
  import { getControlParams } from '$lib/utils/getControlParams'
  import { getDatedTable } from '$lib/utils/tratxt/getStatTable'
  import MainControl from '$lib/components/MainControl.svelte'
  import StatHeader from '$lib/components/StatHeader.svelte'
  import GraphDaysLines from '$lib/components/GraphDaysLines.svelte'
  import GraphCalendar from '$lib/components/GraphCalendar.svelte'

  export let data: PageData

  $: table = getDatedTable(data.records ?? [])
</script>

<main>
  <StatHeader {table} />
  <GraphDaysLines {table} />
</main>

<MainControl params={getControlParams(data)} />

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    margin: 2rem 1rem auto;
    flex-grow: 2;
  }

  @media (min-width: 800px) {
    main {
      margin: 2rem 2rem auto;
    }
  }
</style>
