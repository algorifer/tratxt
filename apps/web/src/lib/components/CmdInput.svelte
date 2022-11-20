<script lang="ts">
  export let value: string = ''
  export let placeholder: string = `Type command`
  export let error: string | null = null

  $: cmd = value
</script>

<div class="wrapper">
  <div class="field">
    <textarea
      name="message"
      bind:value={cmd}
      placeholder={placeholder ?? `Type command`}
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
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 1rem;
  }

  .field {
    width: 100%;
  }

  textarea {
    width: 100%;
    min-height: 2.5rem;
    padding: 0.5rem;
    font-family: inherit;
    font-size: 1rem;
    border: none;
    outline: none;
    color: var(--f-front);
    background: var(--c-gray);
    border-radius: 4px;
    resize: vertical;
    transition: 0.2s ease-in-out;
  }

  textarea::placeholder {
    color: var(--c-back);
    transition: 0.2s ease-in-out;
  }

  textarea:hover::placeholder {
    color: var(--c-front);
  }

  textarea:focus {
    min-height: 5rem;
    color: var(--c-back);
    background: var(--c-front);
  }

  textarea:focus::placeholder {
    color: var(--c-back);
  }

  @media (min-width: 800px) {
    .wrapper {
      flex-direction: row;
      align-items: start;
      gap: 0.5rem;
    }

    button {
      margin: 0.5rem;
    }
  }

  @media (min-width: 1240px) {
    textarea {
      background: var(--c-back);
    }

    textarea::placeholder {
      color: var(--c-gray);
    }
  }
</style>
