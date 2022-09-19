import { writable } from 'svelte-local-storage-store'

interface Theme {
  front: string
  back: string
}

export const theme = writable<Theme>('timeline-theme', {
  front: '#b77353',
  back: '#f2eee9'
})