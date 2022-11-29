<script lang="ts">
  import type { LayoutData } from './$types'
  import ProfileTabs from '$lib/components/ProfileTabs.svelte'
  import FilterLabel from '$lib/components/FilterLabel.svelte'

  export let data: LayoutData

  $: docs = data.docMaps?.filter(({ parents }) => !parents.length).map(({ name }) => name) ?? []
</script>

<header>
  <h1>@{data.profile.name}</h1>
  <div>
    {#if data.profile.description}
      <p>{data.profile.description}</p>
    {/if}
    {#if data.profile.site}
      <a href={data.profile.site} target="_blank" rel="noreferrer">
        {data.profile.site}
      </a>
    {/if}
  </div>
  <ProfileTabs {docs} --area="tabs" />
  <FilterLabel --area="filter" />
</header>

<slot />

<style>
  header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 1rem;
    margin: 2rem 1rem;
    border-bottom: 0.5px solid var(--c-gray);
  }

  h1 {
    margin: 0 0 2rem;
    font-size: 1rem;
  }

  p {
    margin: 0;
  }

  @media (min-width: 800px) {
    header {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-areas:
        'title title empty  empty'
        'desc  desc  filter tabs ';
      align-items: end;
      gap: 1rem 2rem;
      margin: 2rem;
    }

    h1 {
      grid-area: title;
      margin: 0;
    }

    div {
      grid-area: desc;
    }
  }

  @media (min-width: 1240px) {
    header {
      grid-template-areas: 'title filter desc tabs';
    }
  }
</style>
