<script lang="ts">
  import type { PageData, ActionData } from './$types'
  import { getControlParams } from '$lib/utils/getControlParams'
  import MainControl from '$lib/components/MainControl.svelte'
  import StatHeader from '$lib/components/StatHeader.svelte'
  import GraphDaysLines from '$lib/components/GraphDaysLines.svelte'
  import GraphCalendar from '$lib/components/GraphCalendar.svelte'
  import StatList from '$lib/components/StatList.svelte'

  export let data: PageData
  export let form: ActionData
</script>

<div>
  <main>
    <StatHeader count={data.allCount} time={data.allTime} />
    <GraphCalendar calendar={data.calendar} />
    <GraphDaysLines calendar={data.calendar} />
  </main>
  <StatList
    author={data.profile.name}
    projects={data.projects}
    channels={data.channels}
    tags={data.tags}
    moods={data.moods}
    years={data.years}
    months={data.months}
    docs={data.docs}
    --area="lists"
  />
</div>

<MainControl params={getControlParams(data, form)} />

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 2rem 1rem auto;
    flex-grow: 2;
  }

  @media (min-width: 800px) {
    div {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-areas: 'lists graphs graphs';
      margin: 2rem 2rem auto;
    }

    main {
      grid-area: graphs;
      width: 100%;
      max-width: 756px;
    }
  }

  @media (min-width: 1240px) {
    div {
      grid-template-columns: repeat(4, 1fr);
      grid-template-areas: 'lists graphs graphs graphs';
    }
  }
</style>
