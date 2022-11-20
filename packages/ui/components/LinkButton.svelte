<script lang="ts">
  export let href: string
  export let target: '_blank' | undefined = undefined
</script>

<a {href} {target}>
  <slot />
</a>

<style>
  a {
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
    border-radius: 4px;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    outline: none;
  }

  a:hover {
    background: var(--c-back);
    border-color: var(--c-front);
    color: var(--c-front);
  }

  a:focus {
    box-shadow: 0 0 0 3px var(--c-front);
  }

  a:active {
    background: var(--c-front);
    border-color: var(--c-front);
    box-shadow: none;
  }
</style>
