<script lang="ts">
  import { TimeCount, Button } from 'ui'

  import type { Doc } from '$lib/types'
  import { base, tracker, time } from '$lib/stores'
  import { startTracker } from '$lib/utils/startTracker'
  import { stopTracker } from '$lib/utils/stopTracker'

  export let doc: Doc

  const start = () => {
    if (!$base || $base.current) return

    const nextBase = startTracker($base, doc)
    base.set(nextBase)
  }

  const stop = () => {
    if (!$base) return

    const nextBase = stopTracker($base)
    base.set(nextBase)
  }
</script>

{#if $tracker?.doc === doc.id && $time !== null}
  <div>
    <TimeCount value={$time} withMinutes />
    <Button on:click={stop} icon="■" iconLeft>Stop tracker</Button>
  </div>
{:else if !$tracker}
  <div>
    <Button on:click={start} icon="▶" iconLeft>Start tracker</Button>
  </div>
{/if}

<style>
  div {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-shrink: 1;
    margin-left: auto;
  }
</style>
