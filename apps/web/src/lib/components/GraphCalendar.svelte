<script lang="ts">
  import { DateTime } from 'luxon'
  import type { DatedTable } from '../utils/tratxt/getStatTable'
  import { getTimeRecordsByDay } from '../utils/tratxt/getTimeRecords'

  const size = 14
  const padding = 1

  const getWeeks = () => {
    const days = [DateTime.now().minus({ year: 1 })]

    while (days.length <= 365) {
      const prev = days[days.length - 1]
      days.push(prev.plus({ day: 1 }))
    }

    const weeks: DateTime[][] = []

    days.forEach((day, index, arr) => {
      if (index === 0) {
        weeks.push([day])
        return
      }

      if (arr[index - 1].hasSame(day, 'week')) {
        weeks[weeks.length - 1].push(day)
        return
      }

      weeks.push([day])
    })

    return weeks
  }

  const getTimeOpacity = (time: number): number => {
    if (time === 0) return 0.1
    if (time <= 2 * 60) return 0.2
    if (time <= 4 * 60) return 0.4
    if (time <= 6 * 60) return 0.6
    if (time <= 8 * 60) return 0.8
    return 1
  }

  export let table: DatedTable

  const weeks = getWeeks()
  $: recordsByDay = getTimeRecordsByDay(table)
</script>

<svg
  width={weeks.length * size}
  height={7 * size}
  viewBox={`0 0 ${weeks.length * size} ${7 * size}`}
>
  {#each weeks as week, i}
    {#each week as day}
      {@const records = recordsByDay[day.toISODate()] ?? []}
      {@const time = records.reduce((acc, { time }) => acc + time, 0)}
      <rect
        x={i * size + padding}
        y={day.weekday * size + padding}
        width={size - padding * 2}
        height={size - padding * 2}
        fill="var(--c-front)"
        style={`opacity: ${getTimeOpacity(time)};`}
      />
    {/each}
  {/each}
</svg>
