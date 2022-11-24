<script lang="ts">
  import DocsList from './DocsList.svelte'

  export let author: string
  export let parents: string[]
  export let brothers: string[]
  export let children: string[]
  export let current: string
</script>

<section>
  {#if parents.length}
    <DocsList {author} {current} items={parents} />
  {/if}
  <DocsList {author} {current} items={brothers} />
  {#if children.length}
    <DocsList {author} {current} items={children} />
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
