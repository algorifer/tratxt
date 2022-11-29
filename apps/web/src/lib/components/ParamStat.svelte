<script lang="ts">
  import type { ParamItem } from '../utils/tratxt/getParam'

  export let item: ParamItem
  export let title: string
  export let filterUrl: string
  export let recordsUrl: string | undefined = undefined
  export let doc: string | undefined = undefined
  export let docUrl: string | undefined = undefined
</script>

<li style={`--percent: ${item.percent}%`}>
  <div>
    <a href={filterUrl} class="filter">
      <span class="name">{title}</span>
      {#if item.percent}
        <span class="time">
          {item.percent}% ;{item.duration}
        </span>
      {/if}
    </a>
    {#if recordsUrl}
      <a href={recordsUrl} class="records">
        ● {item.count}
      </a>
    {:else}
      <span class="records">
        ● {item.count}
      </span>
    {/if}
    <svg viewBox="0 0 100 2" preserveAspectRatio="none">
      <rect x={0} y={0.5} width={100} height={1} fill="var(--c-gray)" />
      <rect x={0} y="0}" width={item.percent} height={2} fill="var(--c-Front)" />
    </svg>
  </div>
  {#if doc}
    <p>{doc}</p>
  {/if}
  {#if docUrl}
    <a href={docUrl}>Read doc -></a>
  {/if}
</li>

<style>
  div {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
  }

  .name {
    color: var(--c-front);
  }

  .time,
  .records {
    font-family: var(--mono);
    font-size: 0.9rem;
  }

  svg {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
  }
</style>
