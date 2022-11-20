<script lang="ts">
  import { marked } from 'marked'
  import type { PageData } from './$types'
  import ListSection from '$lib/components/ListSection.svelte'

  export let data: PageData
</script>

<main>
  <section class="readme">
    {#if data.project.readme}
      {@html marked(data.project.readme)}
    {/if}
  </section>

  <div class="lists">
    {#if data.project.description}
      <ListSection title="Description">
        <li>– {data.project.description}</li>
      </ListSection>
    {/if}

    {#if data.project.website}
      <ListSection title="Web site ↗">
        <li>
          <a href={data.project.website} target="_blank">{data.project.website}</a>
        </li>
      </ListSection>
    {/if}
  </div>
</main>

<style>
  main {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0 3rem;
    align-items: baseline;
    padding: 1rem;
  }

  .readme {
    grid-column: 1 / 4;
    grid-row: 1;
  }

  .lists {
    grid-column: 4 / 7;
    grid-row: 1;
  }
</style>
