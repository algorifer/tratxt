import type { Readable } from 'svelte/store'
import { derived } from 'svelte/store'

import type { CurrentTime } from '$lib/types'
import { base } from '$lib/stores/base'

export const tracker = derived(base, ($base) => {
  if ($base?.current) return $base.current

  return null
})

export const time = derived<Readable<CurrentTime | null>, number | null>(tracker, ($tracker, set) => {
  const interval = setInterval(() => {
    if (!$tracker) {
      set(null)
      clearInterval(interval)
      return
    }

    const now = Date.now()
    const ms = now - $tracker.start

    const minutes = Math.floor(ms / (1000 * 60))
    set(minutes)
  }, 1000)

  return () => {
		clearInterval(interval)
	}
}, null)