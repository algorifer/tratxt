<script lang="ts">
  import { DateTime, Duration } from 'luxon'
  import type { Record } from 'tratxt'
  import { page } from '$app/stores'

  export let trate: Record & {
    date: string
  }

  $: createDate = DateTime.fromISO(trate.date ?? '')
    .setLocale('en')
    .toLocaleString(DateTime.DATETIME_SHORT)

  $: trate.project

  $: duration = trate.time && Duration.fromObject({ minutes: trate.time }).toFormat('h:mm')
</script>

<article>
  <p class="body">{trate.body}</p>
  <p class="links">
    <a href={`/${trate.author}`} class="author">@{trate.author}</a>
    {#if trate.channel}
      <a href={`${$page.url.pathname}?channel=${trate.channel}`} class="channel">
        /{trate.channel}
      </a>
    {/if}
    {#if trate.project}
      <a href={`${$page.url.pathname}?project=${trate.project}`} class="project">
        ~{trate.project}
      </a>
    {/if}
  </p>
  <p class="meta">
    <span>●</span>
    <span class="create">{createDate}</span>
    {#if duration}
      <span>{duration}t</span>
    {/if}
    {#if trate.mood}
      <span>{trate.mood}m</span>
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
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0 0.5rem;
    margin-top: auto;
    padding-top: 0.25rem;
    font-family: var(--mono);
    font-size: 0.9rem;
    border-top: 0.5px solid var(--c-gray);
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
    gap: 0.5rem;
    color: var(--c-gray);
    font-family: var(--mono);
    font-size: 0.9rem;
    text-transform: uppercase;
  }

  .create {
    margin-right: auto;
  }
</style>
