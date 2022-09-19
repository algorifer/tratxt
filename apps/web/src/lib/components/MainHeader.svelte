<script lang="ts">
  import { page } from '$app/stores'
  import { Button } from 'ui'
  import { user } from '$lib/stores'

  $: console.log($page.routeId)
</script>

<div>
  {#if $page.routeId === 'docs'}
    <h1>Docs</h1>
    <Button href="/docs/create" icon="" iconLeft>New</Button>
  {:else if $page.routeId === 'docs/create'}
    <h1>Create doc</h1>
  {:else}
    <h1>Tracker</h1>
  {/if}
  {#if $user}
    <nav>
      <ul>
        <li>
          <a href="/">Timer</a>
        </li>
        <li>
          <a href="/docs">Docs</a>
        </li>
        <li>
          <a href="/tags">Tags</a>
        </li>
        <li>
          <a href="/times">Times</a>
        </li>
      </ul>
    </nav>
  {/if}
</div>

<style>
  div {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  h1 {
    margin: 0;
    font-size: 1rem;
    line-height: 1rem;
    text-transform: uppercase;
  }

  nav {
    margin-left: auto;
  }

  ul {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    color: var(--c-front);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
