<script lang="ts">
  export let name: string
  export let value: string
  export let placeholder: string
  export let hidden: boolean = false
</script>

<textarea {name} {placeholder} bind:value class:hidden />

<style>
  textarea {
    width: 100%;
    min-height: 1.5rem;
    padding: 0;
    margin: 0;
    font-family: var(--mono);
    font-size: 1rem;
    line-height: inherit;
    border: none;
    outline: none;
    color: var(--c-front);
    background: var(--c-back);
    resize: none;
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
    min-height: 40vh;
  }

  textarea:focus::placeholder {
    color: var(--c-back);
  }

  .hidden {
    display: contents;
    height: 0px;
    min-height: 0px;
    visibility: hidden;
    overflow: hidden;
    opacity: 0;
  }
</style>
