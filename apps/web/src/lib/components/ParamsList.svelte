<script lang="ts">
  export let title: string
  export let count: number
  export let recordCount: number
</script>

<section>
  <h3>
    <span class="name">{title}</span>
    <span class="count">
      {count}::{recordCount}
    </span>
  </h3>
  <ul>
    <slot />
  </ul>
</section>

<style>
  h3 {
    margin: 0 0 0.5rem;
    font-family: var(--mono);
    font-weight: 400;
    font-size: 1rem;
    text-transform: uppercase;
  }

  .count {
    color: var(--c-gray);
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
