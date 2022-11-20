<script lang="ts">
  import { page } from '$app/stores'
  import type { LayoutData } from './$types'

  export let data: LayoutData
</script>

<header>
  <a href={`/${$page.params.authorSlug}/${$page.params.projectSlug}`}>
    ~{$page.params.authorSlug}/{$page.params.projectSlug}
  </a>
  <h1>
    <sup>#{data.note.link_id}</sup>
    {data.note.title}
  </h1>
</header>

<style>
  sup {
    font-weight: 400;
  }

  h1 {
    font-size: 3rem;
    line-height: 3rem;
  }
</style>
