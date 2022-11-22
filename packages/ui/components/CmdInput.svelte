<script lang="ts">
  export let value: string = ''
  export let placeholder: string | undefined = undefined
  export let error: string | null = null

  $: cmd = value
</script>

<div class="wrapper">
  <h1>Tratxt</h1>
  <div class="field">
    <textarea
      name="message"
      bind:value={cmd}
      placeholder={placeholder ?? `Command`}
      spellcheck="false"
      rows="1"
    />
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
    line-height: 1rem;
    text-transform: uppercase;
  }

  button {
    grid-area: button;
  }

  .field {
    width: 100%;
  }

  textarea {
    width: 100%;
    min-height: 1.5rem;
    padding: 0;
    font-family: var(--mono);
    font-size: 1rem;
    border: none;
    outline: none;
    color: var(--c-front);
    background: var(--c-back);
    resize: vertical;
    transition: 0.2s ease-in-out;
  }

  textarea::placeholder {
    color: var(--c-gray);
    transition: 0.2s ease-in-out;
  }

  textarea:hover::placeholder {
    color: var(--c-front);
  }

  textarea:focus {
    min-height: 5rem;
  }

  textarea:focus::placeholder {
    color: var(--c-back);
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
