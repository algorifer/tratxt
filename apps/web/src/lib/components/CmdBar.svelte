<script lang="ts">
  import CmdInput from './CmdInput.svelte'

  export let value: string = ''
  export let placeholder: string = `Type command`
  export let error: string | null = null
  export let userName: string

  $: cmd = value
</script>

<form method="post" action="?/cmd">
  <h1>tratxt</h1>
  <div class="links">
    <a href={`/${userName}`} class="profile">Profile</a>
  </div>
  <CmdInput {value} {placeholder} {error} --area="input" />
</form>

<style>
  form {
    position: sticky;
    top: 0;
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-template-areas:
      'title links'
      'input input';
    align-items: baseline;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
    grid-area: var(--area);
    background: var(--c-back);
  }

  .links {
    grid-area: links;
    display: flex;
    align-items: baseline;
    gap: 1rem;
    text-transform: uppercase;
  }

  a {
    color: var(--c-gray);
  }

  h1 {
    grid-area: title;
    margin: 0;
    padding: 0;
    font-size: 1rem;
    line-height: 1.2rem;
    white-space: nowrap;
    text-transform: uppercase;
  }

  @media (min-width: 800px) {
    form {
      grid-template-columns: auto 1fr auto;
      grid-template-areas: 'title input links';
      align-items: start;
    }

    h1,
    .links {
      margin: 0.5rem;
    }
  }

  @media (min-width: 1240px) {
    form {
      grid-template-columns: auto 1fr 50%;
    }
  }
</style>
