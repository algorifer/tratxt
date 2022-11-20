<script lang="ts">
  import { marked } from 'marked'
  import type { PageData, ActionData } from './$types'
  import { ProfileRole } from '$lib/database'
  import { getControlParams } from '$lib/utils/getControlParams'
  import MainControl from '$lib/components/MainControl.svelte'
  import ListSection from '$lib/components/ListSection.svelte'
  import ProjectsList from '$lib/components/ProjectsList.svelte'
  import TeamMembersList from '$lib/components/TeamMembersList.svelte'
  import TeamsList from '$lib/components/TeamsList.svelte'

  export let data: PageData
  export let form: ActionData

  $: params = getControlParams(data, form)
</script>

<MainControl {params} --area="cmd" />

<main>
  <section class="readme">
    {#if data.profile.readme}
      {@html marked(data.profile.readme)}
    {/if}
  </section>

  <div class="lists">
    {#if data.profile.description}
      <ListSection title="Description">
        <li>– {data.profile.description}</li>
      </ListSection>
    {/if}

    {#if data.profile.website}
      <ListSection title="Web site ↗">
        <li>
          <a href={data.profile.website} target="_blank">{data.profile.website}</a>
        </li>
      </ListSection>
    {/if}

    <ProjectsList
      authorSlug={data.profile.slug}
      projects={data.projects}
      owner={data.role === ProfileRole.Owner}
    />

    {#if data.profile.is_team}
      <TeamMembersList members={data.members} />
    {/if}

    {#if !data.profile.is_team}
      <TeamsList
        authorSlug={data.userSlug}
        teams={data.teams}
        owner={data.role === ProfileRole.Owner}
      />
    {/if}
  </div>
</main>

<style>
  main {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0 3rem;
    align-items: baseline;
    padding: 1rem 2rem;
  }

  .readme {
    grid-column: 1 / 4;
    grid-row: 1;
  }

  .lists {
    grid-column: 4 / 7;
    grid-row: 1;
  }
</style>
