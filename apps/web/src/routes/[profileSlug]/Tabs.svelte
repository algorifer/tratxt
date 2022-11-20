<script lang="ts">
  import { page } from '$app/stores'

  const baseRoute = '/[profileSlug]'
  $: basePath = `/${$page.params.profileSlug}`
</script>

<ul>
  <li>
    <a href={`${basePath}`} class:active={$page.route.id === baseRoute}>Trates</a>
  </li>
  <li>
    <a href={`${basePath}/info`} class:active={$page.route.id === `${baseRoute}/info`}>Info</a>
  </li>
  <li>
    <a href={`${basePath}/stat`} class:active={$page.route.id === `${baseRoute}/stat`}>Stat</a>
  </li>
</ul>

<style>
  ul {
    display: flex;
    gap: 1rem;
    margin: 0;
    padding: 0;
    grid-area: var(--area);
    list-style: none;
    text-transform: uppercase;
  }

  a {
    color: var(--c-gray);
  }

  .active {
    color: var(--c-front);
  }

  @media (min-width: 1240px) {
    ul {
      flex-direction: column;
      gap: 0;
    }
  }
</style>
