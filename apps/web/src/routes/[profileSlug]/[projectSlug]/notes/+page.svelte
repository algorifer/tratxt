<script lang="ts">
  import { page } from '$app/stores'
  import type { PageData } from './$types'
  import { ProjectRole } from '$lib/database'
  import NotesViewMenu from '$lib/components/NotesViewMenu.svelte'
  import NotesList from '$lib/components/NotesList.svelte'

  export let data: PageData

  $: baseUrl = `/${$page.params.authorSlug}/${$page.params.projectSlug}`
</script>

<main>
  {#if data.role !== ProjectRole.Everyone}
    <a href={`${baseUrl}/create-note`} class="create">Create note</a>
  {/if}
  <NotesViewMenu
    baseUrl={`${baseUrl}/notes`}
    basePath="/[authorSlug]/[projectSlug]/notes"
    --area="view"
  />
  <NotesList {baseUrl} notes={data.notes} --area="list" />
</main>

<style>
  main {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0 3rem;
    grid-template-areas:
      'create create list list list list'
      'view   view   list list list list';
    padding: 1rem 2rem;
  }

  .create {
    grid-area: create;
    margin-bottom: 1rem;
    font-family: var(--mono);
    text-transform: uppercase;
  }
</style>
