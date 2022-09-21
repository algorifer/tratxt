<script lang="ts">
  import { Button } from 'ui'

  import { rootDocs } from '$lib/stores'
  import DocCard from '$lib/components/DocCard.svelte'
</script>

<section>
  {#if $rootDocs.length === 0}
    <p>Docs not founded</p>
  {:else}
    <ul>
      {#each $rootDocs as doc (doc.id)}
        <li>
          <DocCard {doc} />
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style>
  ul {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
