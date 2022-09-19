<script lang="ts">
  import Avatar from 'svelte-boring-avatars'

  export let username: string
  export let onlyAvatar: boolean = false
  export let size: number = 32
</script>

<a href={`/users/${username}`}>
  <Avatar variant="beam" name={username} {size} />
  {#if !onlyAvatar}
    <span>@{username}</span>
  {/if}
</a>

<style>
  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: var(--c-front);
    font-weight: 600;
  }

  a:hover {
    text-decoration: underline;
  }

  a :global(svg) {
    border: 2px solid var(--c-back);
    border-radius: 50%;
    transition: 0.2s ease-in-out;
  }

  a:hover :global(svg) {
    border-color: var(--c-front);
  }
</style>
