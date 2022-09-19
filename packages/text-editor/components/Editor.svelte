<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'

  type AreaEvent = Event & {
    currentTarget: EventTarget & HTMLTextAreaElement
  }

  export let name: string
  export let value: string
  export let label: string | undefined

  let editor = undefined

  onMount(async () => {
    const { editorAction } = await import('../utils/editorAction')
    editor = editorAction
  })

  const dispatch = createEventDispatcher()

  const editorChange = (e: string) => {
    value = e
    dispatch('change', e)
  }

  const areaChange = (e: AreaEvent) => {
    value = e.currentTarget.value
    dispatch('change', e.currentTarget.value)
  }
</script>

<div class="field" title={label}>
  {#if editor}
    <p
      id={name}
      contenteditable
      aria-roledescription="input"
      aria-label={`${label} input`}
      class="input"
      use:editor={{
        value,
        change: editorChange
      }}
    >
      {value}
    </p>
  {:else}
    <textarea
      id={name}
      {name}
      bind:value
      aria-label={`${label} input`}
      on:change={areaChange}
      class="input"
    />
  {/if}
  <label for={name}>
    <span class="arrow" aria-hidden="true">→</span>
    {#if label && value.length === 0}
      <span class="label">{label}</span>
    {/if}
  </label>
</div>

<style>
  .field {
    position: relative;
    width: 100%;
    font-size: 1rem;
  }

  label {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    gap: 1rem;
    pointer-events: none;
    transition: 0.2s ease-in-out;
  }

  .arrow {
    padding: 0.5rem;
    font-weight: bold;
    opacity: 0.6;
    transition: 0.2s ease-in-out;
  }

  .label {
    font-style: italic;
    transform: translateY(10%);
  }

  .input {
    height: 100%;
    margin: 0;
    padding: 0.5rem;
    padding-left: 3rem;
    font-size: 1rem;
    line-height: inherit;
    overflow: hidden;
  }

  .input:hover ~ label .arrow {
    opacity: 1;
  }

  .input:focus ~ label {
    gap: 2rem;
  }

  .input:focus ~ label .arrow {
    opacity: 1;
    color: var(--c-back);
    background: var(--c-front);
  }

  .input :global(pre) {
    margin: 0;
    padding: 0.5rem 1rem;
    width: 100%;
    font-family: var(--mono);
    font-size: 1rem;
    border: none;
  }

  .input :global(.codejar-linenumbers) {
    background: transparent;
    color: var(--c-front);
  }

  .input :global(pre:focus) {
    border-color: var(--c-front);
  }

  .input :global(pre:focus ~ span) {
    background: var(--c-front);
    color: var(--c-back);
  }

  .input :global(.title) {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .input :global(.list) {
    padding-left: 1rem;
  }

  .input :global(.hr) {
    display: inline-block;
    width: 100%;
    border-bottom: 2px solid var(--c-front);
  }

  .input :global(.bold) {
    font-weight: 600;
  }

  .input :global(.italic) {
    font-style: italic;
  }

  .input :global(.punctuation) {
    opacity: 0.5;
  }
</style>
