<script lang="ts">
  import { page } from '$app/stores'

  export let docs: string[]

  const baseRoute = '/[profileSlug]'
  $: basePath = `/${$page.params.profileSlug}`
</script>

<ul>
  <li>
    <a href={`${basePath}`} class:active={$page.route.id === baseRoute}>Feed</a>
  </li>
  <li>
    <a href={`${basePath}/stat`} class:active={$page.route.id === `${baseRoute}/stat`}>Stat</a>
  </li>
  {#each docs as doc}
    <li>
      <a href={`${basePath}/${doc}`} class:active={$page.route.id === `${baseRoute}/${doc}`}>
        {doc}
      </a>
    </li>
  {/each}
</ul>

<style>
  ul {
    display: flex;
    gap: 1rem;
    margin: 0;
    padding: 0;
    grid-area: var(--area);
    list-style: none;
    font-family: var(--mono);
    text-transform: uppercase;
  }

  .active {
    color: var(--c-front);
  }
</style>
