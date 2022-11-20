<script lang="ts">
  interface Item {
    name: string
    count: number
    time: number
  }

  export let prefix: string
  export let type: string
  export let items: Item[]
  export let allTime: number
</script>

<ul>
  {#each items as item (item.name)}
    {@const timePercent = item.time && Math.floor((item.time / allTime) * 100)}
    <li>
      <a href={`?${type}=${item.name}`}>
        {prefix}{item.name}
      </a>
      <span class="count">
        {#if timePercent}
          {timePercent}%
        {/if}
        {item.count}
      </span>
    </li>
  {/each}
</ul>

<style>
  ul {
    margin: 0 0 1rem;
    padding: 0;
    grid-column: 2 / 4;
    list-style: none;
  }

  li {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
  }

  a {
    display: flex;
    width: 100%;
    padding: 0 0.25rem;
    white-space: nowrap;
    color: var(--c-front);
  }

  .count {
    font-family: var(--mono);
    color: var(--c-gray);
    font-size: 0.9rem;
  }
</style>
