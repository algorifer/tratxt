<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { DateTime } from 'luxon'
  import { enhance } from '$app/forms'
  import CmdInput from './CmdInput.svelte'

  export let value: string = ''
  export let placeholder: string = `Type command`
  export let error: string | null = null
  export let userName: string
  export let tracker: string | undefined = undefined

  let duration: string | undefined = undefined
  let interval: NodeJS.Timer | undefined = undefined

  const getDuration = (startTime?: string) => {
    if (!startTime) {
      duration = undefined
      if (interval) clearInterval(interval)
      return
    }

    const start = DateTime.fromISO(startTime)
    const diff = DateTime.now().diff(start, ['hours', 'minutes', 'second']).toObject()
    duration = `${diff.hours}:${diff.minutes}`

    interval = setInterval(() => {
      const diff = DateTime.now().diff(start, ['hours', 'minutes', 'second']).toObject()
      duration = `${diff.hours}:${diff.minutes}`
    }, 1000)
  }

  $: getDuration(tracker)

  onDestroy(() => {
    if (interval) clearInterval(interval)
  })

  $: start = tracker && DateTime.fromISO(tracker).toFormat('hh:mm')
</script>

<form method="post" action="?/cmd" use:enhance>
  <h1>tratxt</h1>
  <div class="links">
    <a href={`/${userName}`} class="profile">Profile</a>
    {#if duration}
      <span>Traker: {duration}</span>
    {:else if start}
      <span>Traker started: {start}</span>
    {/if}
  </div>
  <CmdInput {value} {placeholder} {error} --area="input" />
</form>

<style>
  form {
    position: sticky;
    top: 0;
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-template-areas:
      'title links'
      'input input';
    align-items: baseline;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
    grid-area: var(--area);
    background: var(--c-back);
  }

  .links {
    grid-area: links;
    display: flex;
    align-items: baseline;
    gap: 1rem;
    text-transform: uppercase;
  }

  a {
    color: var(--c-gray);
  }

  span {
    margin-left: auto;
    font-family: var(--mono);
  }

  h1 {
    grid-area: title;
    margin: 0;
    padding: 0;
    font-size: 1rem;
    line-height: 1.2rem;
    white-space: nowrap;
    text-transform: uppercase;
  }

  @media (min-width: 800px) {
    form {
      grid-template-columns: auto 1fr auto;
      grid-template-areas: 'title input links';
      align-items: start;
      gap: 2rem;
    }

    h1,
    .links {
      margin: 0.5rem;
    }
  }

  @media (min-width: 1240px) {
    form {
      grid-template-columns: auto 1fr 50%;
    }
  }
</style>
