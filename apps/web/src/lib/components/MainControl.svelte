<script lang="ts">
  import type { ControlParams } from '../types'
  import AuthBar from './AuthBar.svelte'
  import InitBar from './InitBar.svelte'
  import CmdBar from './CmdBar.svelte'

  export let params: ControlParams
</script>

{#if !params.userId}
  <AuthBar success={params.authSuccess} error={params.authError} />
{:else if !params.userName}
  <InitBar error={params.initError} />
{:else}
  <CmdBar
    userName={params.userName}
    placeholder={params.placeholder}
    value={params.cmdValue}
    errorMessage={params.cmdError}
  />
{/if}
