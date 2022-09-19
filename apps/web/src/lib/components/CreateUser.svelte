<script lang="ts">
  import { Button, TextField } from 'ui'

  import { user, base } from '$lib/stores'
  import { createUser } from '$lib/utils/createUser'

  let name: string = ''

  type FormSubmitEvent =
    | (Event & {
        currentTarget: EventTarget & HTMLFormElement
      })
    | (SubmitEvent & {
        currentTarget: EventTarget & HTMLFormElement
      })

  const submit = (e: FormSubmitEvent) => {
    e.preventDefault()

    if (name.length === 0 || name.includes(' ')) return

    const newBase = createUser(name)
    base.set(newBase)
  }
</script>

{#if $user === null}
  <section>
    <div class="wrapper">
      <h2>Create user</h2>
      <form on:submit={submit}>
        <TextField name="name" label="Name" bind:value={name} />
        <Button type="submit">Create</Button>
      </form>
    </div>
  </section>
{/if}

<style>
  .section {
    display: flex;
  }

  .wrapper {
    max-width: 360px;
  }

  h2 {
    margin: 0 0 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
</style>
