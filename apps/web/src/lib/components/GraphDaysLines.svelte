<script lang="ts">
  import type { Calendar } from '../utils/tratxt/getCalendar'
  import GraphDayLine from './GraphDayLine.svelte'

  export let calendar: Calendar

  $: days = calendar
    .reduce((acc, it) => [...acc, ...it], [])
    .reverse()
    .slice(0, 40)
</script>

<section>
  <svg
    width="100%"
    height={days.length * 3}
    viewBox={`0 0 100 ${days.length * 3}`}
    preserveAspectRatio="none"
  >
    {#each days as day, i}
      <GraphDayLine records={day.timeLines} y={i * 3} />
    {/each}
  </svg>
</section>

<style>
  section {
    margin: 2rem 0;
  }
</style>
