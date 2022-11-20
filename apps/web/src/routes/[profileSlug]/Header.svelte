<script lang="ts">
  import { page } from '$app/stores'
  import Tabs from './Tabs.svelte'
  import FilterLabel from './FilterLabel.svelte'

  export let description: string = ''
</script>

<header>
  <h1>@{$page.params.profileSlug}</h1>
  {#if description}
    <p>{description}</p>
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
    font-size: 1rem;
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
        'desc  site  filter';
    }

    h1 {
      grid-area: title;
    }

    p {
      grid-area: desc;
    }
  }

  @media (min-width: 1240px) {
    header {
      grid-template-columns: repeat(4, 1fr);
      grid-template-areas:
        'title filter tabs tabs'
        'desc  site   tabs tabs';
    }
  }
</style>
