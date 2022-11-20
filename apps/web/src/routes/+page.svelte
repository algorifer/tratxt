<script lang="ts">
  import type { PageData, ActionData } from './$types'
  import MainControl from '$lib/components/MainControl.svelte'
  import { getControlParams } from '$lib/utils/getControlParams'

  export let data: PageData
  export let form: ActionData

  $: params = getControlParams(data, form)
</script>

<div>
  <MainControl {params} />
</div>

<style>
  div {
    padding: 0 2rem;
  }
</style>
