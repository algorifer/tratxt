<script lang="ts">
  export let error: string | null = null
</script>

<form method="post" action="?/init">
  <h1>tratxt</h1>
  <div class="input">
    <input name="name" type="text" placeholder="Enter your username for create profile's file" />
    <span class="border" />
    {#if error}
      <p>{error}</p>
    {/if}
  </div>
  <div class="buttons">
    <button>enter →</button>
  </div>
</form>

<style>
  form {
    position: sticky;
    top: 0;
    display: grid;
    grid-template-columns: 1fr;
    align-items: baseline;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
    background: var(--c-back);
  }

  h1 {
    margin: 0;
    font-size: 1rem;
    line-height: 1.2rem;
    white-space: nowrap;
  }

  div {
    width: 100%;
  }

  .buttons {
    display: flex;
    align-items: baseline;
    gap: 1rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    font-family: inherit;
    font-size: 1rem;
    border: none;
    outline: none;
    color: var(--f-front);
    background: var(--c-gray);
    border-radius: 4px;
    transition: 0.2s ease-in-out;
  }

  input::placeholder {
    color: var(--c-back);
    transition: 0.2s ease-in-out;
  }

  input:hover::placeholder {
    color: var(--c-front);
  }

  input:focus {
    color: var(--c-back);
    background: var(--c-front);
  }

  @media (min-width: 800px) {
    form {
      grid-template-columns: auto 1fr auto;
    }
  }

  @media (min-width: 1240px) {
    form {
      grid-template-columns: auto 1fr 50%;
    }

    input {
      background: var(--c-back);
    }

    input::placeholder {
      color: var(--c-gray);
    }
  }
</style>
