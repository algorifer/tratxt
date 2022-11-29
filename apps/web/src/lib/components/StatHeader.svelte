<script lang="ts">
  import { Duration } from 'luxon'
  import { page } from '$app/stores'

  export let count: number
  export let time: number

  const getCleanLink = (sp: URLSearchParams, param: string) => {
    const searchParams = new URLSearchParams(sp)
    searchParams.delete(param)

    if (param === 'year') searchParams.delete('month')

    return `${$page.url.pathname}?${searchParams.toString()}`
  }

  $: projectFilter = $page.url.searchParams.get('project')
  $: channelFilter = $page.url.searchParams.get('channel')
  $: tagFilter = $page.url.searchParams.get('tag')
  $: moodFilter = $page.url.searchParams.get('mood')
  $: yearFilter = $page.url.searchParams.get('year')
  $: monthFilter = $page.url.searchParams.get('month')

  $: duration = Duration.fromObject({ minutes: time }).toFormat('h:mm')
</script>

<section>
  <dl>
    <dt>Records</dt>
    <dd>{count}</dd>
    <dt>Total Time</dt>
    <dd>{duration}</dd>
  </dl>
  <ul>
    {#if yearFilter}
      <li>
        <a href={getCleanLink($page.url.searchParams, 'year')}>
          <span class="name">{yearFilter}</span> ✗
        </a>
      </li>
    {/if}
    {#if monthFilter}
      <li>
        <a href={getCleanLink($page.url.searchParams, 'month')}>
          <span class="name">{monthFilter}</span> ✗
        </a>
      </li>
    {/if}
    {#if projectFilter}
      <li>
        <a href={getCleanLink($page.url.searchParams, 'project')}>
          <span class="name">~{projectFilter}</span> ✗
        </a>
      </li>
    {/if}
    {#if channelFilter}
      <li>
        <a href={getCleanLink($page.url.searchParams, 'channel')}>
          <span class="name">/{channelFilter}</span> ✗
        </a>
      </li>
    {/if}
    {#if tagFilter}
      <li>
        <a href={getCleanLink($page.url.searchParams, 'tag')}>
          <span class="name">#{tagFilter}</span> ✗
        </a>
      </li>
    {/if}
    {#if moodFilter}
      <li>
        <a href={getCleanLink($page.url.searchParams, 'mood')}>
          <samp class="name">:{moodFilter}</samp> ✗
        </a>
      </li>
    {/if}
  </ul>
</section>

<style>
  section {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    align-items: start;
    margin-bottom: 2rem;
  }

  dl {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: auto;
    grid-template-rows: repeat(2, auto);
    gap: 0.5rem 2rem;
    margin: 0;
    margin-right: auto;
  }

  dt {
    font-family: var(--mono);
    text-transform: uppercase;
  }

  dd {
    padding: 0;
    margin: 0;
    font-family: var(--mono);
    font-weight: 600;
    font-size: 2rem;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    font-family: var(--mono);
    text-align: right;
    text-transform: uppercase;
  }

  .name {
    color: var(--c-front);
  }
</style>
