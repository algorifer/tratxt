<script lang="ts">
  import { slide } from 'svelte/transition'

  export let name: string
  export let value: string = ''
  export let label: string | undefined = undefined
  export let placeholder: string = 'Enter text...'
  export let maxlength: number | undefined = undefined
  export let help: string | undefined = undefined
  export let ref: HTMLTextAreaElement | undefined = undefined
</script>

<div class="field">
  {#if label}
    <label for={name}>
      {label}
    </label>
  {/if}
  <textarea
    bind:this={ref}
    id={name}
    {name}
    {placeholder}
    {maxlength}
    {value}
    spellcheck="false"
    rows="3"
  />
  {#if help}
    <span transition:slide>{help}</span>
  {/if}
</div>

<style>
  .field {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0 3rem;
    grid-area: var(--area);
  }

  label {
    grid-column: 1;
    font-family: var(--mono);
    text-transform: uppercase;
  }

  textarea {
    grid-column: 2 / 4;
    width: 100%;
    padding: 0.5rem;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    outline: none;
    background: var(--c-input-back);
    color: var(--c-input-front);
    border: none;
    transition: 0.2s ease-in-out;
    resize: vertical;
  }
</style>
