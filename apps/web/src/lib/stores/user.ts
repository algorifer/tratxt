import { derived } from 'svelte/store'

import { base } from '$lib/stores/base'

export const user = derived(base, ($base) => {
  if ($base?.user) return $base.user

  return null
})