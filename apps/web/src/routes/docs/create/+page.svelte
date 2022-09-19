<script lang="ts">
  import { slide } from 'svelte/transition'

  import { TitleField, HoursField, Button } from 'ui'
  import { TextEditor } from 'text-editor'

  import { base } from '$lib/stores'
  import { createDoc } from '$lib/utils/createDoc'

  type FormSubmitEvent =
    | (Event & {
        currentTarget: EventTarget & HTMLFormElement
      })
    | (SubmitEvent & {
        currentTarget: EventTarget & HTMLFormElement
      })

  let title: string = ''
  let content: string = ''
  let estimate: number | null = null
  let perDay: number | null = null

  const addEstimate = () => {
    estimate = 0
  }
  const addPerDay = () => {
    perDay = 0
  }

  const submit = (e: FormSubmitEvent) => {
    e.preventDefault()

    if (!$base) return

    const nextBase = createDoc($base, {
      title,
      content,
      estimate,
      perDay
    })

    base.set(nextBase)
  }
</script>

<form on:submit={submit}>
  <TitleField name="title" label="Title" bind:value={title} />
  <div class="body">
    <div class="meta">
      {#if estimate === null}
        <div transition:slide={{ duration: 100 }}>
          <Button on:click={addEstimate} icon="" iconLeft>Add estimate</Button>
        </div>
      {:else}
        <div transition:slide={{ duration: 100 }}>
          <HoursField name="estimate" label="hours for this task" bind:value={estimate} />
        </div>
      {/if}
      {#if perDay === null}
        <div transition:slide={{ duration: 100 }}>
          <Button on:click={addPerDay} icon="" iconLeft>Add day traget</Button>
        </div>
      {:else}
        <div transition:slide={{ duration: 100 }}>
          <HoursField name="perDay" label="hours in day" bind:value={perDay} max={24} />
        </div>
      {/if}
      <Button type="submit">Create</Button>
    </div>
    <TextEditor name="content" label="Content" bind:value={content} />
  </div>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    border: 1px solid var(--c-front);
  }

  .body {
    display: flex;
    gap: 2rem;
  }

  .meta {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 2rem;
    width: 50%;
    flex-shrink: 0;
  }
</style>
