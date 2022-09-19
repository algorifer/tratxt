<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let type: 'button' | 'submit' | 'reset' = 'button'
  export let href: string | undefined = undefined
  export let icon: string = '→'
  export let iconLeft: boolean = false

  const dispatch = createEventDispatcher()

  const click = () => dispatch('click')
</script>

{#if href}
  <a {href} on:click={click} class:iconLeft>
    <span class="label">
      <slot />
    </span>
    <span class="icon" aria-hidden="true">{icon}</span>
  </a>
{:else}
  <button {type} on:click={click} class:iconLeft>
    <span class="label">
      <slot />
    </span>
    <span class="icon" aria-hidden="true">{icon}</span>
  </button>
{/if}

<style>
  button,
  a {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin: 1px 0;
    font-family: inherit;
    font-size: 1rem;
    padding: 0.2rem 0.5rem;
    text-decoration: none;
    white-space: nowrap;
    color: var(--c-front);
    background: var(--c-back);
    border: none;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    outline: none;
  }

  button:focus,
  a:focus {
    border-color: var(--c-back);
    box-shadow: 0 0 0 1px var(--c-front);
  }

  button:hover > .label,
  a:hover > .label {
    text-decoration: underline;
  }

  button:active,
  a:active {
    background: var(--c-back);
    border-color: var(--c-back);
    box-shadow: none;
  }

  .icon {
    text-decoration: none;
  }

  .iconLeft {
    flex-direction: row-reverse;
  }
</style>
