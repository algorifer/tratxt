<script lang="ts">
  import { page } from '$app/stores'
  import type { PageData, ActionData } from './$types'
  import { TextField, TextArea, Button, Editor } from 'ui'
  import { enhance } from '$app/forms'

  export let data: PageData
  export let form: ActionData

  $: slug = form?.values.slug ?? ''

  $: slugError = data.names.includes(slug) ? 'This name already use' : undefined
</script>

<header>
  <h1>
    <a href={`/${$page.params.profileSlug}`}>
      ~{$page.params.profileSlug}
    </a>
    <span>/Create project</span>
  </h1>
</header>

<form method="post" action="?/create" use:enhance>
  <input type="hidden" name="author" value={data.author.id} />
  <TextField name="slug" label="Name" bind:value={slug} help={slugError} --area="slug" />
  <TextArea name="description" label="Description" value={form?.values.description} --area="desc" />
  <TextField name="website" label="Web site" value={form?.values.website} --area="site" />
  <Editor name="readme" label="README" value={form?.values.readme} --area="editor" />
  {#if form?.error}
    <p class="error">! {form.error}</p>
  {/if}
  <div class="button">
    <Button type="submit">Create</Button>
  </div>
</form>

<style>
  header {
    padding: 1rem 2rem;
    margin-bottom: 2rem;
  }

  h1 {
    grid-column: 1 / 4;
    grid-row: 1;
    margin: 0;
    line-height: 2.5rem;
  }

  a {
    text-decoration: none;
    color: var(--c-gray);
  }

  a:hover {
    text-decoration: underline;
  }

  form {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: auto;
    grid-template-areas:
      'slug slug slug editor editor editor'
      'desc desc desc editor editor editor'
      'site site site editor editor editor'
      'message message message editor editor editor'
      'button button button editor editor editor';
    padding: 1rem 2rem;
    gap: 1rem 3rem;
    align-items: start;
  }

  p {
    grid-area: message;
  }

  .button {
    grid-area: button;
    text-align: right;
  }
</style>
