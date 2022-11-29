<script lang="ts">
  import type { TimeLine } from '../utils/tratxt/getCalendar'

  export let records: TimeLine[]
  export let y: number = 0
</script>

<g x={0} {y} width={100} height={2}>
  <rect x={0} y={y + 0.75} width={100} height={0.5} fill="var(--c-gray)" />
  {#each records as record}
    <rect x={record.start} {y} width={record.end - record.start} height={2} fill="var(--c-front)" />
  {/each}
</g>
