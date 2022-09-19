<script lang="ts">
  interface Level {
    id: string
    value: number
    max?: number
  }

  export let levels: Level[]
  export let width: string | undefined = undefined
  export let height: string | undefined = undefined

  const getItems = (currentLevel: Level): { id: number; isValue: boolean }[] => {
    const items = new Array(currentLevel.max).fill(0)
    return items.map((_, i) => ({
      id: i,
      isValue: i < currentLevel.value
    }))
  }

  const getItemWidth = (itemsCount: number, gapWidth: number): number =>
    (100 - gapWidth * (itemsCount - 1)) / itemsCount
</script>

<svg {width} {height} viewBox={`0 0 100 ${levels.length * 6 - 2}`} preserveAspectRatio="none">
  {#each levels as level, index (level.id)}
    {@const items = getItems(level)}
    {@const itemWidth = getItemWidth(items.length, 1)}
    {#each items as item, i (item.id)}
      <rect
        x={i * (itemWidth + 1)}
        y={index * 6}
        width={itemWidth}
        height={4}
        fill="var(--c-front)"
        opacity={item.isValue ? 1 : 0.5}
      />
    {/each}
  {/each}
</svg>

<style>
  rect {
    transition: 0.2s;
  }
</style>
