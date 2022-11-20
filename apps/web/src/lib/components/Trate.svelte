<script lang="ts">
  import { DateTime, Duration } from 'luxon'
  import type { Record } from 'tratxt'

  export let trate: Record

  $: createDate = DateTime.fromISO(trate.date ?? '')
    .setLocale('en')
    .toLocaleString(DateTime.DATETIME_SHORT)

  $: trate.project

  $: duration = trate.time && Duration.fromObject({ minutes: trate.time }).toFormat('h:mm')
</script>

<article>
  <p class="body">{trate.body}</p>
  <div>
    <a href={`/${trate.author}`} class="author">@{trate.author}</a>
    {#if trate.project}
      <a href={`/${trate.project}`} class="project">
        ~{trate.project}
      </a>
    {/if}
    {#if trate.channel}
      <a href={`/${trate.channel}`} class="channel">
        /{trate.channel}
      </a>
    {/if}
  </div>
  <div class="meta">
    <span>●</span>
    <span class="create">{createDate}</span>
    {#if duration}
      <span> ;{duration}</span>
    {/if}
    {#if trate.mood}
      <span> :{trate.mood}</span>
    {/if}
  </div>
</article>

<style>
  article {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .body {
    margin: 0;
  }

  div {
    display: flex;
    flex-wrap: wrap;
    gap: 0 0.5rem;
    color: var(--c-gray);
  }

  .author {
    font-weight: 600;
  }

  a,
  span {
    color: var(--c-gray);
    white-space: nowrap;
  }

  span {
    font-family: var(--mono);
    font-size: 0.9rem;
  }
</style>
