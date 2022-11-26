<script lang="ts">
  import type { DatedTable } from '../utils/tratxt/getStatTable'
  import { getTimeRecordsByDay } from '../utils/tratxt/getTimeRecords'
  import GraphDayLine from './GraphDayLine.svelte'

  export let table: DatedTable

  $: byDays = getTimeRecordsByDay(table)
  $: days = Array.from(Object.values(byDays))

  $: console.log(byDays)
</script>

<svg
  width="100%"
  height={days.length * 3}
  viewBox={`0 0 100 ${days.length * 3}`}
  preserveAspectRatio="none"
>
  {#each days as day, i}
    <GraphDayLine records={day} y={i * 3} />
  {/each}
</svg>
