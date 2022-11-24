<script lang="ts">
  export let author: string
  export let items: string[]
  export let current: string
</script>

<ul>
  {#each items as item (item)}
    <li>
      <a href={`/${author}/${item}`} class:current={current === item}>{item}</a>
    </li>
  {/each}
</ul>

<style>
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .current {
    color: var(--c-front);
  }
</style>
