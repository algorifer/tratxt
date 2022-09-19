<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  type ChangeEvent = Event & {
    currentTarget: EventTarget & HTMLSpanElement
  }

  export let name: string
  export let value: string
  export let label: string | undefined = undefined

  let isJS: boolean = false

  onMount(() => {
    isJS = true
  })

  const dispatch = createEventDispatcher()

  const change = (e: ChangeEvent) => {
    value = e.currentTarget.textContent
    dispatch('change', e.currentTarget.textContent)
  }
</script>

<div class="field" title={label} aria-label={`${label} field`}>
  {#if isJS}
    <span
      class="input"
      id={name}
      contenteditable="true"
      on:input={change}
      spellcheck="false"
      aria-roledescription="input"
      aria-label={`${label} input`}
    >
      {value}
    </span>
  {:else}
    <input
      class="input"
      id={name}
      {name}
      type="text"
      bind:value
      on:change={change}
      spellcheck="false"
      aria-label={`${label} input`}
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
    font-size: 4rem;
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
  }

  .input {
    display: block;
    width: 100%;
    padding: 0.5rem;
    padding-left: 6rem;
    font-family: inherit;
    font-size: 4rem;
    color: inherit;
    background: none;
    border: none;
    outline: none;
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

  .input:focus ~ label .label {
    opacity: 0.5;
  }
</style>
