<script lang="ts">
  import type { PageData, ActionData } from './$types'
  import { getControlParams } from '$lib/utils/getControlParams'
  import MainControl from '$lib/components/MainControl.svelte'
  import ParamsList from '$lib/components/ParamsList.svelte'
  import DocsNav from '$lib/components/DocsNav.svelte'

  export let data: PageData
  export let form: ActionData

  $: readme = data.docs.find(({ name }) => name === 'README')

  $: console.log(data.docs)
</script>

<main>
  {#if readme}
    <section>
      {readme.body}
    </section>
  {/if}
  {#if data.children.length}
    <DocsNav
      author={data.profile.name}
      current="README"
      parents={[]}
      brothers={['README']}
      children={data.children}
      --area="docs"
    />
  {/if}
  <div class="lists">
    {#if data.projects.length}
      <ParamsList
        title="Projects"
        prefix="~"
        basicUrl={`/${data.profile.name}/project:`}
        items={data.projects}
        allTime={data.allTime}
        docs={data.docs}
      />
    {/if}
    {#if data.channels.length}
      <ParamsList
        title="Channels"
        prefix="/"
        basicUrl={`/${data.profile.name}/channel:`}
        items={data.channels}
        allTime={data.allTime}
        docs={data.docs}
      />
    {/if}
    {#if data.tags.length}
      <ParamsList
        title="Tags"
        prefix="#"
        basicUrl={`/${data.profile.name}/tag:`}
        items={data.tags}
        allTime={data.allTime}
        docs={data.docs}
      />
    {/if}
    {#if data.tags.length}
      <ParamsList
        title="Moods"
        prefix=":"
        basicUrl={`/${data.profile.name}/mood:`}
        items={data.moods}
        allTime={data.allTime}
        docs={data.docs}
      />
    {/if}
  </div>
</main>

<MainControl params={getControlParams(data, form)} />

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    flex-grow: 2;
    margin: 2rem 1rem auto;
  }

  .lists {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
    flex-grow: 2;
    align-content: start;
  }

  @media (min-width: 800px) {
    main {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: auto 1fr;
      grid-template-areas:
        'docs   lists '
        'readme lists';
      gap: 2rem;
      align-items: start;
      align-content: start;
      margin: 2rem 2rem auto;
    }

    section {
      grid-area: readme;
    }

    .lists {
      grid-area: lists;
    }
  }
</style>
