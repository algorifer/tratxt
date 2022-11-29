<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'
  import TextArea from './TextArea.svelte'

  export let name: string
  export let value: string = ''

  // let editorAction = undefined

  // const dispatch = createEventDispatcher()

  // onMount(async () => {
  //   const { action } = await import('../utils/action')
  //   editorAction = action
  // })
</script>

<div class="wrapper">
  <!-- {#if editorAction}
    {#if !value.length}
      <span in:fade>Command</span>
    {/if}
    <div
      class="editor"
      use:editorAction={{
        value,
        onChange: (str) => (value = str),
        onSubmit: () => dispatch('submit')
      }}
    >
      {value}
    </div>
  {/if} -->
  <TextArea {name} placeholder="Command" {value} />
</div>

<style>
  .wrapper {
    position: relative;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    color: var(--c-gray);
    pointer-events: none;
  }

  .editor {
    width: 100%;
    padding: 0;
    margin: 0;
    font-family: var(--mono);
    font-size: 1rem;
    border: none;
    outline: none;
    color: var(--c-front);
    background: var(--c-back);
    transition: 0.2s ease-in-out;
  }

  .editor :global(.command) {
    color: var(--c-back);
    background-color: var(--c-gray);
  }

  .editor :global(.channel),
  .editor :global(.project) {
    font-weight: 600;
    color: var(--c-gray);
  }

  .editor :global(.tag) {
    color: var(--c-gray);
  }

  .editor :global(.url) {
    text-decoration: underline;
    color: var(--c-gray);
  }

  .editor :global(.time),
  .editor :global(.mood) {
    font-style: italic;
    color: var(--c-gray);
  }
</style>
