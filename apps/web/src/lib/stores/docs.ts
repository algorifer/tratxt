import { derived } from 'svelte/store'

import { base } from '$lib/stores/base'

export const rootDocs = derived(base, ($base) => {
  if (!$base) return []

  return $base.docs.filter(({ parent }) => parent.length === 0)
})