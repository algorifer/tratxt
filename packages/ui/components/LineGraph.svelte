<script lang="ts">
  enum ItemType {
    Max,
    Value,
    Tracked
  }

  export let max: number
  export let value: number
  export let tracked: number
  export let height: number | string = '1rem'

  let items: ItemType[] = []

  $: {
    items = new Array(max).fill(ItemType.Max)
  }

  $: typedItems = items.map((_, i) => {
    if (i < tracked) return ItemType.Tracked
    if (i < value) return ItemType.Value
    return ItemType.Max
  })
</script>

<svg {height} viewBox={`0 0 ${max * 4} 16`}>
  {#each typedItems as it, i}
    <rect
      x={i * 4}
      y={it === ItemType.Max ? 8 : 0}
      width={2}
      height={it === ItemType.Max ? 8 : 16}
      fill="var(--c-front)"
      opacity={it === ItemType.Tracked ? 1 : 0.5}
    />
  {/each}
</svg>

<style>
  rect {
    transition: 0.2s;
  }
</style>
