<script lang="ts">
  import { slide } from 'svelte/transition'

  import LeveledCountGraph from './LeveledCountGraph.svelte'

  import { getTimeLevels } from '../utils/timeCount'

  export let value: number

  export let daySize: number = 24
  export let withMinutes: boolean = false

  $: levels = getTimeLevels(value, daySize, withMinutes)
</script>

{#if levels.length}
  <div transition:slide>
    <LeveledCountGraph {levels} width="8rem" height="1.2rem" />
    {#each levels as level (level.id)}
      <span>{level.value}{level.id}</span>
    {/each}
  </div>
{/if}

<style>
  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-style: italic;
  }
</style>
