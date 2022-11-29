<script lang="ts">
  import type { DocMap } from '../utils/docs/createDocMap'
  import DocsList from './DocsList.svelte'

  export let author: string
  export let map: DocMap

  $: console.log(map)
</script>

<section>
  {#if map.parents.length}
    <DocsList {author} current={map.name} items={map.parents} />
  {/if}
  <DocsList {author} current={map.name} items={map.brothers} />
  {#if map.children.length}
    <DocsList {author} current={map.name} items={map.children} />
  {/if}
</section>

<style>
  section {
    grid-area: var(--area);
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
</style>
