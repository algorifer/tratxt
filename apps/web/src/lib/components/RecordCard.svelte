<script lang="ts">
  import type { TraRecord } from '../types'
  import { DateTime, Duration } from 'luxon'
  import { bodyParse } from 'editor'
  import { getDurationPercentByDay } from '../utils/getTimes'

  export let trate: TraRecord

  $: createDate = DateTime.fromISO(trate.date)
    .setLocale('en')
    .toLocaleString(DateTime.DATETIME_SHORT)
  $: duration = trate.time && Duration.fromObject({ minutes: trate.time }).toFormat('h:mm')
  $: [start, end] = getDurationPercentByDay(trate.date, trate.time)
</script>

<article style={`--start: ${start}%; --end: ${end}%;`}>
  <p class="body">{@html bodyParse(trate.body)}</p>
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
    margin-top: auto;
    padding-top: 0.25rem;
    font-family: var(--mono);
    font-size: 0.9rem;
  }

  .links::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: block;
    height: 1px;
    background-image: linear-gradient(
      to right,
      var(--c-gray) var(--start),
      var(--c-front) var(--start),
      var(--c-front) var(--end),
      var(--c-gray) var(--end)
    );
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
