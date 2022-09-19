<script lang="ts">
  import { UserBadge, TimeCount, TimeProgress } from 'ui'

  import { base, time } from '$lib/stores'
  import { getDocTrackedTime } from '$lib/utils/getDocTrackedTime'
  import type { Doc } from '$lib/types'
  import DocTracker from './DocTracker.svelte'

  export let doc: Doc

  $: trackedTime = getDocTrackedTime($base, doc, $time)
</script>

<article>
  <h1>
    <a href={`/docs/${doc.id}`}>
      {doc.title}
    </a>
  </h1>
  <div>
    <UserBadge username={doc.assigned} />
    {#if doc.estimate}
      <TimeProgress max={doc.estimate} value={trackedTime} metr="hours" label="Estimate" />
    {/if}
    <DocTracker {doc} />
  </div>
</article>

<style>
  article {
    padding: 1rem;
    border: 1px dashed var(--c-front);
  }

  h1 {
    margin: 0 0 1rem;
    font-size: 3rem;
    font-weight: 400;
  }

  a {
    color: var(--c-front);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  h1::after {
    content: '↗';
    margin-left: 1rem;
  }

  div {
    display: flex;
    align-items: center;
    gap: 1rem 2rem;
    flex-wrap: wrap;
  }
</style>
