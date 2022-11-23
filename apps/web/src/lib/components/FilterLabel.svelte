<script lang="ts">
  import { page } from '$app/stores'

  let prefix: string | null = null

  $: if ($page.route.id?.endsWith('project[x+3a][name]')) {
    prefix = '~'
  } else if ($page.route.id?.endsWith('channel[x+3a][name]')) {
    prefix = '/'
  } else if ($page.route.id?.endsWith('tag[x+3a][name]')) {
    prefix = '#'
  } else if ($page.route.id?.endsWith('mood[x+3a][name]')) {
    prefix = '⍨'
  } else {
    prefix = null
  }

  $: back = $page.url.pathname.split('/').slice(0, -1).join('/')
</script>

{#if prefix}
  <a aria-label="Clean filter" title="Clean filter" href={back}>
    <span>Filter: </span>
    <span class="name">{prefix}{$page.params.name}</span>
    <span> ✗</span>
  </a>
{/if}

<style>
  a {
    grid-area: var(--area);
    font-family: var(--mono);
    text-transform: uppercase;
  }

  .name {
    color: var(--c-front);
  }
</style>
