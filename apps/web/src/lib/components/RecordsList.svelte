<script lang="ts">
  import type { TraRecord } from '../types'
  import RecordCard from './RecordCard.svelte'
  import Pagination from './Pagination.svelte'

  export let count: number
  export let size: number
  export let records: TraRecord[]
</script>

<section>
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
  <Pagination {count} {size} />
</section>

<style>
  section {
    grid-area: var(--area);
  }

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    flex-direction: column;
    gap: 4rem;
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
