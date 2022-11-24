<script lang="ts">
  interface Doc {
    name: string
    body: string
  }

  export let author: string
  export let doc: Doc

  $: desc = doc.body.split('\n').filter((it) => Boolean(it))[0] ?? ''
</script>

<li>
  <p>{desc}</p>
  <a href={`/${author}/${doc.name}`}>Read doc -></a>
</li>

<style>
  p {
    margin: 0 0 1rem;
  }

  a {
    font-family: var(--mono);
    text-transform: uppercase;
  }
</style>
