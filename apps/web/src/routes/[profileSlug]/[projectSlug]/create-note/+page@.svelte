<script lang="ts">
  import { TextField, Button, Editor } from 'ui'
  import { page } from '$app/stores'
  import { enhance } from '$app/forms'
  import type { ActionData } from './$types'

  export let form: ActionData
</script>

<header>
  <h1>
    <a href={`/${$page.params.authorSlug}`}>
      ~{$page.params.authorSlug}
    </a>
    <a href={`/${$page.params.authorSlug}/${$page.params.projectSlug}`}>
      /{$page.params.projectSlug}
    </a>
    <span>/Create note </span>
  </h1>
</header>

<form method="post" action="?/create" use:enhance>
  <TextField name="title" label="Title" value={form?.values?.title ?? ''} --area="title" />
  <Editor name="content" label="Content" value={form?.values?.content ?? ''} --area="editor" />
  {#if form?.error}
    <p class="error">! {form.error}</p>
  {/if}
  <div class="button">
    <Button type="submit">Create</Button>
  </div>
</form>

<style>
  header {
    margin-bottom: 2rem;
    padding: 1rem 2rem;
  }

  h1 {
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
      'title title title editor editor editor'
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
