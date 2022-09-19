import type { Base } from '$lib/types'

export const createUser = (name: string): Base => ({
  user: {
    name,
    fullName: '',
    links: [],
  },
  docs: [],
  times: [],
  tags: [],
  reports: [],
  current: null,
})