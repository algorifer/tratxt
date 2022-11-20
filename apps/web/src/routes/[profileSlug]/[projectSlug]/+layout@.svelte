<script lang="ts">
  import { page } from '$app/stores'
  import type { LayoutData } from './$types'
  import { ProjectRole } from '$lib/database'

  export let data: LayoutData

  const baseRoute = '/[authorSlug]/[projectSlug]'
  $: basePath = `/${$page.params.authorSlug}/${data.project.slug}`
</script>

{#key data.project.id}
  <header>
    <h1>
      <a href={`/${$page.params.authorSlug}`}>~{$page.params.authorSlug}</a>
      <slug>/{data.project.slug}</slug>
    </h1>
    <ul>
      <li>
        <a href={`${basePath}`} class:active={$page.route.id === baseRoute}>Info</a>
      </li>
      <li>
        <a href={`${basePath}/feed`} class:active={$page.route.id === `${baseRoute}/feed`}>Feed</a>
      </li>
      <li>
        <a href={`${basePath}/notes`} class:active={$page.route.id === `${baseRoute}/notes`}>
          Notes
        </a>
      </li>
      <li>
        <a href={`${basePath}/stat`} class:active={$page.route.id === `${baseRoute}/stat`}>Stat</a>
      </li>
      {#if data.role === ProjectRole.Admin}
        <li>
          <a
            href={`${basePath}/settings`}
            class:active={$page.route.id === `${baseRoute}/settings`}
          >
            Settings
          </a>
        </li>
      {/if}
    </ul>
  </header>
  <slot />
{/key}

<style>
  header {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0 3rem;
    align-items: baseline;
    padding: 1rem 2rem;
    margin-bottom: 2rem;
  }

  h1 {
    grid-column: 1 / 4;
    grid-row: 1;
    margin: 0;
    line-height: 2.5rem;
  }

  a {
    text-decoration: none;
    color: var(--c-gray);
  }

  a:hover {
    text-decoration: underline;
  }

  ul {
    display: flex;
    gap: 1rem;
    grid-column: 4 / 7;
    grid-row: 1;
    margin: 0;
    padding: 0;
    list-style: none;
    text-transform: uppercase;
    font-family: var(--mono);
  }

  .active {
    color: var(--c-front);
  }
</style>
