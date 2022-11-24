<script lang="ts">
  import { onDestroy } from 'svelte'
  import { DateTime } from 'luxon'
  import { CmdInput } from 'ui'
  import { enhance } from '$app/forms'

  export let value: string = ''
  export let error: string | null = null
  export let userName: string
  export let placeholder: string | undefined = undefined
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
    duration = DateTime.now().diff(start, ['hours', 'minutes', 'second']).toFormat('h:mm')

    interval = setInterval(() => {
      duration = DateTime.now().diff(start, ['hours', 'minutes', 'second']).toFormat('h:mm')
    }, 1000)
  }

  $: getDuration(tracker)

  onDestroy(() => {
    if (interval) clearInterval(interval)
  })

  $: start = tracker && DateTime.fromISO(tracker).toFormat('hh:mm')
</script>

<form method="post" action="?/cmd" use:enhance>
  <CmdInput {value} {placeholder} {error} --area="input" />
  <div class="links">
    <a href={`/${userName}`} class="profile">@{userName}</a>
  </div>
  {#if duration}
    <span>current;{duration}</span>
  {:else if start}
    <span>started;{start}</span>
  {/if}
</form>

<style>
  form {
    position: sticky;
    bottom: 0;
    grid-area: var(--area);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 0;
    margin: 4rem 1rem 0;
    background: var(--c-back);
    border-top: 0.5px solid var(--c-gray);
  }

  .links {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    text-transform: uppercase;
  }

  span {
    margin-left: auto;
    font-family: var(--mono);
    text-transform: uppercase;
  }

  @media (min-width: 800px) {
    form {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-template-rows: auto 1fr;
      grid-template-areas: 'input links' 'input tracker';
      align-content: start;
      gap: 1rem 2rem;
      margin: 4rem 2rem 0;
    }

    .links {
      margin-left: auto;
      grid-area: links;
    }

    span {
      grid-area: tracker;
    }
  }

  @media (min-width: 1240px) {
    form {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
