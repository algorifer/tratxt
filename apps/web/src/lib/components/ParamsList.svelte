<script lang="ts">
  import { Duration } from 'luxon'
  import type { ParamStat } from '../utils/tratxt/getParam'

  export let title: string
  export let prefix: string
  export let basicUrl: string
  export let items: ParamStat[]
  export let allTime: number
</script>

<section>
  <h3>
    <span class="name">{title}</span>
    <span class="time">
      {items.length}::{items.reduce((acc, it) => acc + it.count, 0)}
    </span>
  </h3>
  <ul>
    {#each items as item (item.name)}
      {@const percent = item.time && Math.floor((item.time / allTime) * 100)}
      {@const duration = Duration.fromObject({ minutes: item.time }).toFormat('h:mm')}
      <li style={`--percent: ${percent}%`}>
        <a href={`${basicUrl}${item.name}`}>
          <span class="name">{prefix}{item.name}</span>
          <span class="count">{item.count}</span>
          {#if percent}
            <span class="time">
              {percent}% : {duration}
            </span>
          {/if}
        </a>
      </li>
    {/each}
  </ul>
</section>

<style>
  h3 {
    margin: 0 0 1rem;
    font-family: var(--mono);
    font-size: 1rem;
    font-weight: 400;
    text-transform: uppercase;
    color: var(--c-gray);
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    position: relative;
    display: flex;
    width: 100%;
    padding: 0.5rem 0 0.5rem;
    white-space: nowrap;
  }

  a:hover {
    text-decoration: none;
    color: var(--c-front);
  }

  a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: block;
    height: 1px;
    background-image: linear-gradient(
      to right,
      var(--c-front) var(--percent),
      var(--c-gray) var(--percent)
    );
  }

  .name {
    color: var(--c-front);
  }

  .count,
  .time {
    font-family: var(--mono);
    font-size: 0.9rem;
  }

  .count {
    margin: 0 auto 0 1rem;
  }
</style>
