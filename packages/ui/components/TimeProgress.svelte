<script lang="ts">
  import LeveledCountGraph from './LeveledCountGraph.svelte'

  export let max: number
  export let value: number
  export let metr: string = ''
  export let label: string | undefined = undefined

  $: tracked = Math.floor(value / (max / 25))
</script>

<div title={`${value} / ${max} ${metr}`}>
  <LeveledCountGraph
    width="8rem"
    height="1rem"
    levels={[
      {
        id: metr,
        max: 25,
        value: tracked
      }
    ]}
  />
  {#if label}
    <span>{label}</span>
  {/if}
</div>

<style>
  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>
