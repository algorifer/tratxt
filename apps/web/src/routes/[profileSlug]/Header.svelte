<script lang="ts">
  import type { TratxtMeta } from 'tratxt'
  import Tabs from './Tabs.svelte'
  import FilterLabel from './FilterLabel.svelte'

  export let meta: TratxtMeta
</script>

<header>
  <h1>@{meta.author}</h1>
  {#if meta.description}
    <p>{meta.description}</p>
  {/if}
  {#if meta.site}
    <a href={meta.site} target="_blank">{meta.site}</a>
  {/if}
  <Tabs --area="tabs" />
  <FilterLabel --area="filter" />
</header>

<style>
  header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    margin-top: 4rem;
    margin-bottom: 2rem;
  }

  h1 {
    margin: 0;
    font-size: 2rem;
    font-weight: 400;
  }

  p {
    margin: 0;
  }

  @media (min-width: 800px) {
    header {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-areas:
        'title title tabs'
        'desc  empty filter'
        'site  empty filter';
      gap: 0 2rem;
    }

    h1 {
      grid-area: title;
      margin-bottom: 1rem;
    }

    p {
      grid-area: desc;
    }

    a {
      grid-area: site;
    }
  }

  @media (min-width: 1240px) {
    header {
      grid-template-columns: repeat(4, 1fr);
      grid-template-areas:
        'title filter tabs tabs'
        'desc  empty  tabs tabs'
        'site  empty  tabs tabs';
    }
  }
</style>
