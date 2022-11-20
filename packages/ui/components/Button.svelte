<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let name: string | undefined = undefined
  export let value: string | undefined = undefined
  export let formaction: string | undefined = undefined
  export let type: 'button' | 'submit' | 'reset' = 'button'

  const dispatch = createEventDispatcher()

  const click = () => dispatch('click')
</script>

<button {type} on:click={click} {name} {value} {formaction}>
  <slot />
</button>

<style>
  button {
    display: inline-flex;
    align-items: center;
    justify-content: start;
    gap: 1rem;
    font-family: inherit;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    text-decoration: none;
    white-space: nowrap;
    color: var(--c-back);
    background: var(--c-front);
    border: 1px solid var(--c-back);
    cursor: pointer;
    transition: 0.2s ease-in-out;
    outline: none;
  }

  button:hover {
    background: var(--c-back);
    border-color: var(--c-front);
    color: var(--c-front);
  }

  button:focus {
    box-shadow: 0 0 0 3px var(--c-front);
  }

  button:active {
    background: var(--c-front);
    border-color: var(--c-front);
    box-shadow: none;
  }
</style>
