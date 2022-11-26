<script lang="ts">
  import type { TimeRecord } from '../utils/tratxt/getTimeRecords'
  import { getDurationPercentByDay } from '../utils/getTimes'

  export let records: TimeRecord[]
  export let y: number = 0
</script>

<g x={0} {y} width={100} height={2}>
  <rect x={0} y={y + 0.5} width={100} height={1} fill="var(--c-gray)" />
  {#each records as record}
    {@const [start, end] = getDurationPercentByDay(record.date, record.time)}
    <rect x={start} {y} width={end - start} height={2} fill="var(--c-front)" />
  {/each}
</g>
