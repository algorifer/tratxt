<script lang="ts">
  import type { ParamItem } from '../utils/tratxt/getParam'
  import { page } from '$app/stores'
  import ParamStat from './ParamStat.svelte'
  import ParamsList from './ParamsList.svelte'

  interface Doc {
    name: string
    body: string
  }

  export let author: string
  export let projects: ParamItem[]
  export let channels: ParamItem[]
  export let tags: ParamItem[]
  export let moods: ParamItem[]
  export let years: ParamItem[]
  export let months: ParamItem[]
  export let docs: Doc[]

  const getDoc = (name: string): string | undefined =>
    docs
      .find((it) => it.name === name)
      ?.body.split('\n')
      .filter((it) => Boolean(it))[0]

  const getFilterUrl = (sp: URLSearchParams, name: string, value: string) => {
    const searchParams = new URLSearchParams(sp)
    searchParams.set(name, value)
    return `${$page.url.pathname}?${searchParams.toString()}`
  }
</script>

<aside>
  <ParamsList
    title="Years"
    count={years.length}
    recordCount={years.reduce((acc, it) => acc + it.count, 0)}
  >
    {#each years as item (item.name)}
      <ParamStat
        {item}
        title={item.name}
        filterUrl={getFilterUrl($page.url.searchParams, 'year', item.name)}
      />
    {/each}
  </ParamsList>
  {#if $page.url.searchParams.has('year')}
    <ParamsList
      title="Months"
      count={months.length}
      recordCount={months.reduce((acc, it) => acc + it.count, 0)}
    >
      {#each months as item (item.name)}
        <ParamStat
          {item}
          title={item.name}
          filterUrl={getFilterUrl($page.url.searchParams, 'month', item.name)}
        />
      {/each}
    </ParamsList>
  {/if}
  <ParamsList
    title="Projects"
    count={projects.length}
    recordCount={projects.reduce((acc, it) => acc + it.count, 0)}
  >
    {#each projects as item (item.name)}
      {@const doc = getDoc(item.name)}
      <ParamStat
        {item}
        title={`~${item.name}`}
        recordsUrl={`/${author}/project:${item.name}`}
        filterUrl={getFilterUrl($page.url.searchParams, 'project', item.name)}
        {doc}
        docUrl={doc && `/${author}/${item.name}`}
      />
    {/each}
  </ParamsList>
  <ParamsList
    title="Channels"
    count={channels.length}
    recordCount={channels.reduce((acc, it) => acc + it.count, 0)}
  >
    {#each channels as item (item.name)}
      <ParamStat
        {item}
        title={`/${item.name}`}
        recordsUrl={`/${author}/channel:${item.name}`}
        filterUrl={getFilterUrl($page.url.searchParams, 'channel', item.name)}
      />
    {/each}
  </ParamsList>
  <ParamsList
    title="Moods"
    count={moods.length}
    recordCount={moods.reduce((acc, it) => acc + it.count, 0)}
  >
    {#each moods as item (item.name)}
      <ParamStat
        {item}
        title={`:${item.name}`}
        recordsUrl={`/${author}/mood:${item.name}`}
        filterUrl={getFilterUrl($page.url.searchParams, 'mood', item.name)}
      />
    {/each}
  </ParamsList>
  <ParamsList
    title="Tags"
    count={tags.length}
    recordCount={tags.reduce((acc, it) => acc + it.count, 0)}
  >
    {#each tags as item (item.name)}
      <ParamStat
        {item}
        title={`#${item.name}`}
        recordsUrl={`/${author}/tag:${item.name}`}
        filterUrl={getFilterUrl($page.url.searchParams, 'tag', item.name)}
      />
    {/each}
  </ParamsList>
</aside>

<style>
  aside {
    grid-area: var(--area);
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
</style>
