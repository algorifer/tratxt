<script lang="ts">
  import type { PageData, ActionData } from './$types'
  import { getControlParams } from '$lib/utils/getControlParams'
  import MainControl from '$lib/components/MainControl.svelte'
  import ParamsList from '$lib/components/ParamsList.svelte'

  export let data: PageData
  export let form: ActionData
</script>

<main>
  {#if data.projects.length}
    <ParamsList
      title="Projects"
      prefix="~"
      basicUrl={`/${data.profile.name}/project:`}
      items={data.projects}
      allTime={data.allTime}
    />
  {/if}
  {#if data.channels.length}
    <ParamsList
      title="Channels"
      prefix="/"
      basicUrl={`/${data.profile.name}/channel:`}
      items={data.channels}
      allTime={data.allTime}
    />
  {/if}
  {#if data.tags.length}
    <ParamsList
      title="Tags"
      prefix="#"
      basicUrl={`/${data.profile.name}/tag:`}
      items={data.tags}
      allTime={data.allTime}
    />
  {/if}
  {#if data.tags.length}
    <ParamsList
      title="Moods"
      prefix=":"
      basicUrl={`/${data.profile.name}/mood:`}
      items={data.moods}
      allTime={data.allTime}
    />
  {/if}
</main>

<MainControl params={getControlParams(data, form)} />

<style>
  main {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
    align-content: start;
    flex-grow: 2;
    padding: 0 2rem;
  }
</style>
