<script lang="ts">
  import { Editor } from 'editor'

  export let value: string = ''
  export let error: string | null = null

  $: cmd = value
</script>

<div class="wrapper">
  <h1>Tratxt</h1>
  <div class="field">
    <Editor name="message" {value} on:submit />
    {#if error}
      <p>{error}</p>
    {/if}
  </div>
  <button aria-label="Send command">→ Send</button>
</div>

<style>
  .wrapper {
    grid-area: var(--area);
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      'title button'
      'input input';
    align-items: end;
    gap: 1rem;
  }

  h1 {
    grid-area: title;
    margin: 0;
    font-size: 1rem;
    text-transform: uppercase;
  }

  button {
    grid-area: button;
    font-family: var(--mono);
    text-transform: uppercase;
  }

  .field {
    width: 100%;
  }

  @media (min-width: 800px) {
    .wrapper {
      grid-template-columns: auto 1fr;
      grid-template-areas:
        'title input '
        'title button';
      align-items: start;
      gap: 1rem 0.5rem;
    }

    button {
      justify-self: end;
    }
  }

  @media (min-width: 1240px) {
  }
</style>
