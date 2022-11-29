<script lang="ts">
  import { page } from '$app/stores'

  export let count: number
  export let size: number

  const createPagePoint = (searchParams: URLSearchParams) => (i: number) => {
    const qs = new URLSearchParams(searchParams)
    qs.set('page', i.toString())
    return `${$page.url.pathname}?${qs.toString()}`
  }

  $: pageQuery = parseInt($page.url.searchParams.get('page') ?? '1', 10)
  $: currentPage = isNaN(pageQuery) ? 1 : pageQuery
  $: pages = new Array(Math.ceil(count / size)).fill(0).map((_, i) => ({
    i: i + 1,
    href: createPagePoint($page.url.searchParams)(i + 1)
  }))
</script>

<ul>
  {#each pages as it}
    <li><a href={it.href} class:current={it.i === currentPage}>{it.i}</a></li>
  {/each}
</ul>

<style>
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 2rem 0;
    padding: 0;
    list-style: none;
    font-family: var(--mono);
  }

  .current {
    color: var(--c-front);
  }
</style>
