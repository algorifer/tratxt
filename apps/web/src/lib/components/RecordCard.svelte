<script lang="ts">
  import type { TraRecord } from '../types'
  import { DateTime, Duration } from 'luxon'
  import { bodyParse } from 'editor'
  import { getDurationPercentByDay } from '../utils/getTimes'
  import GraphDayLine from './GraphDayLine.svelte'

  export let trate: TraRecord

  $: createDate = DateTime.fromISO(trate.date)
    .setLocale('en')
    .toLocaleString(DateTime.DATETIME_SHORT)
  $: duration = trate.time && Duration.fromObject({ minutes: trate.time }).toFormat('h:mm')
</script>

<article>
  <p class="body">{@html bodyParse(trate.body)}</p>
  <svg width="100%" height={2} viewBox="0 0 100 2" preserveAspectRatio="none">
    <GraphDayLine records={[{ date: DateTime.fromISO(trate.date), time: trate.time }]} />
  </svg>
  <p class="links">
    <a href={`/${trate.author}`} class="author">@{trate.author}</a>
    {#if trate.channel}
      <a href={`/${trate.author}/channel:${trate.channel}`} class="channel">
        /{trate.channel}
      </a>
    {/if}
    {#if trate.project}
      <a href={`/${trate.author}/project:${trate.project}`} class="project">
        ~{trate.project}
      </a>
    {/if}
  </p>
  <p class="meta">
    <span>●</span>
    <span class="create">{createDate}</span>
    {#if duration}
      <span>;{duration}</span>
    {/if}
    {#if trate.mood}
      <span>:{trate.mood}</span>
    {/if}
  </p>
</article>

<style>
  article {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  article :global(svg) {
    margin-top: auto;
  }

  p {
    margin: 0;
  }

  .body {
    margin: 0 0 1rem;
  }

  .links {
    position: relative;
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0 0.5rem;
    padding-top: 0.25rem;
    font-family: var(--mono);
    font-size: 0.9rem;
  }

  svg {
    width: 100%;
  }

  a {
    color: var(--c-gray);
  }

  a:hover {
    color: var(--c-front);
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    color: var(--c-gray);
    font-family: var(--mono);
    font-size: 0.9rem;
    text-transform: uppercase;
  }

  .create {
    margin-right: auto;
  }
</style>
