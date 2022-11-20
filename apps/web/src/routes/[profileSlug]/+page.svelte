<script lang="ts">
  import type { PageData, ActionData } from './$types'
  import { page } from '$app/stores'
  import { getControlParams } from '$lib/utils/getControlParams'
  import MainControl from '$lib/components/MainControl.svelte'
  import Header from './Header.svelte'
  import FilterList from '$lib/components/FilterList.svelte'
  import Trate from '$lib/components/Trate.svelte'

  export let data: PageData
  export let form: ActionData

  $: params = getControlParams(data, form)

  $: projectFilter = $page.url.searchParams.get('project')
  $: channelFilter = $page.url.searchParams.get('channel')
  $: tagFilter = $page.url.searchParams.get('tag')
  $: moodFilter = $page.url.searchParams.get('mood')
</script>

<MainControl {params} --area="cmd" />
<Header meta={data.meta} />
<main>
  <ul>
    {#if !data.records?.length}
      <li>Trates not founded</li>
    {/if}
    {#each data.records as trate, i (trate.date)}
      <li>
        <Trate {trate} />
      </li>
    {/each}
  </ul>
  <aside>
    {#if data.projects?.length}
      <FilterList prefix="~" type="project" items={data.projects} allTime={data.allTime} />
    {/if}
    {#if data.channels?.length}
      <FilterList prefix="/" items={data.channels} type="channel" allTime={data.allTime} />
    {/if}
    {#if data.tags?.length}
      <FilterList prefix="#" type="tag" items={data.tags} allTime={data.allTime} />
    {/if}
    {#if data.moods?.length}
      <FilterList prefix="Mood: " type="mood" items={data.moods} allTime={data.allTime} />
    {/if}
  </aside>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    align-content: start;
    gap: 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  @media (min-width: 800px) {
    main {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-areas: 'filter list list';
      gap: 1rem;
    }

    aside {
      grid-area: filter;
    }

    ul {
      grid-area: list;
    }
  }

  @media (min-width: 1240px) {
    main {
      grid-template-columns: repeat(4, 1fr);
      grid-template-areas: 'filter list list list';
    }
  }
</style>
