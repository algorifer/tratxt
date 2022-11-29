<script lang="ts">
  import type { Calendar } from '../utils/tratxt/getCalendar'

  export let calendar: Calendar

  const size = 14
  const padding = 2

  const getTimeOpacity = (time: number): number => {
    if (time === 0) return 0.1
    if (time <= 2 * 60) return 0.2
    if (time <= 4 * 60) return 0.4
    if (time <= 6 * 60) return 0.6
    if (time <= 8 * 60) return 0.8
    return 1
  }
</script>

<svg viewBox={`0 0 ${calendar.length * size} ${7 * size}`}>
  {#each calendar as week, i}
    {#each week as day}
      <rect
        x={i * size + padding}
        y={(day.weekDay - 1) * size + padding}
        width={size - padding * 2}
        height={size - padding * 2}
        rx={(size - padding * 2) / 2}
        fill="var(--c-front)"
        style={`opacity: ${getTimeOpacity(day.time)};`}
      />
    {/each}
  {/each}
</svg>
