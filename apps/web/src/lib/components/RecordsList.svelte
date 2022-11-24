<script lang="ts">
  import type { Record } from 'tratxt'
  import Trate from './Trate.svelte'

  export let records: (Record & {
    date: string
  })[]
</script>

<ul>
  <slot />
  {#if !records.length}
    <li>Trates not founded</li>
  {/if}
  {#each records as trate, i (trate.date)}
    <li>
      <Trate {trate} />
    </li>
  {/each}
</ul>

<style>
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    flex-direction: column;
    gap: 2rem;
    grid-area: var(--area);
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
