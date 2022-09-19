import { writable } from 'svelte-local-storage-store'

import type { Base } from '$lib/types'

export const base = writable<Base | null>('database', null)