<script lang="ts">
  import { page } from '$app/stores'

  $: projectFilter = $page.url.searchParams.get('project')
  $: channelFilter = $page.url.searchParams.get('channel')
  $: tagFilter = $page.url.searchParams.get('tag')
  $: moodFilter = $page.url.searchParams.get('mood')

  $: show = Boolean(projectFilter || channelFilter || tagFilter || moodFilter)
</script>

{#if show}
  <a aria-label="Clean filter" title="Clean filter" href={`/${$page.params.profileSlug}`}>
    <span>Filter: </span>
    {#if projectFilter}
      <span class="name">~{projectFilter}</span>
    {:else if channelFilter}
      <span class="name">/{channelFilter}</span>
    {:else if tagFilter}
      <span class="name">#{tagFilter}</span>
    {:else if moodFilter}
      <span class="name">[{moodFilter}]</span>
    {/if}
    <span> ✗</span>
  </a>
{/if}

<style>
  a {
    grid-area: var(--area);
    text-transform: uppercase;
    color: var(--c-gray);
  }

  .name {
    color: var(--c-front);
  }
</style>
