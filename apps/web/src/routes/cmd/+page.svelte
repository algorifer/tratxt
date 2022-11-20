<script lang="ts">
  import type { PageData, ActionData } from './$types'
  import { getControlParams } from '$lib/utils/getControlParams'
  import MainControl from '$lib/components/MainControl.svelte'

  export let data: PageData
  export let form: ActionData

  $: params = getControlParams(data, form)
</script>

<MainControl {params} />

<h1>Commands documentation</h1>
