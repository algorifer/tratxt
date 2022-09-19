<script lang="ts">
  import { theme } from '$lib/stores'
</script>

<div>
  <input type="color" bind:value={$theme.front} />
  <input type="color" bind:value={$theme.back} />
</div>

<style>
  div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
</style>
