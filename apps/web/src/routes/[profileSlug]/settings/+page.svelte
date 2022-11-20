<script lang="ts">
  import { TextField, TextArea, Button, Editor } from 'ui'

  import { enhance } from '$app/forms'
  import type { PageData, ActionData } from './$types'

  export let data: PageData
  export let form: ActionData

  $: values = form?.author ? form.author : data.profile
</script>

<form method="post" action="?/update" use:enhance>
  <TextArea
    name="description"
    label="Description"
    placeholder="Max 140 symbols"
    maxlength={140}
    value={values.description ?? ''}
    --area="desc"
  />
  <TextField
    name="website"
    label="Web Site"
    placeholder="http://example.com"
    value={values.website ?? ''}
    --area="site"
  />
  <Editor name="readme" label="Read me" value={values.readme ?? ''} --area="editor" />
  {#if form?.success}
    <p>Updated</p>
  {/if}
  {#if form?.error}
    <p class="error">! {form.error}</p>
  {/if}
  <div class="buttons">
    <Button type="submit">Update</Button>
  </div>
</form>

<style>
  form {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: auto;
    grid-template-areas:
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

  .buttons {
    grid-area: button;
    text-align: right;
  }
</style>
