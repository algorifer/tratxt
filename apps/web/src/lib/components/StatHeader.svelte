<script lang="ts">
  import { Duration } from 'luxon'
  import type { DatedTable } from '../utils/tratxt/getStatTable'
  import GraphCalendar from './GraphCalendar.svelte'

  export let table: DatedTable

  $: count = table.hash.length
  $: time = Duration.fromObject({
    minutes: table.time.reduce((acc, it) => acc + it, 0)
  }).toFormat('h:mm')
</script>

<section>
  <dl>
    <dt>Records</dt>
    <dd>{count}</dd>
    <dt>Total Time</dt>
    <dd>{time}</dd>
  </dl>
  <GraphCalendar {table} />
</section>

<style>
  section {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }

  dl {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: auto;
    grid-template-rows: repeat(2, auto);
    gap: 1rem 2rem;
    margin-right: auto;
  }

  dt {
    font-family: var(--mono);
    text-transform: uppercase;
  }

  dd {
    padding: 0;
    margin: 0;
    font-family: var(--mono);
    font-weight: 600;
    font-size: 2rem;
  }
</style>
