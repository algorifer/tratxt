<script lang="ts">
  import type { TraRecord } from '../types'
  import RecordCard from './RecordCard.svelte'

  export let records: TraRecord[]
</script>

<ul>
  <slot />
  {#if !records.length}
    <li>Trates not founded</li>
  {/if}
  {#each records as trate, i (trate.date)}
    <li>
      <RecordCard {trate} />
    </li>
  {/each}
</ul>

<style>
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    flex-direction: column;
    gap: 4rem;
    grid-area: var(--area);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  @media (min-width: 800px) {
    ul {
      gap: 2rem;
    }
  }
</style>
