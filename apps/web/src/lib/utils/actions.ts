import type { Actions } from '@sveltejs/kit'
import { email, github } from './auth'
import { init } from './initAction'
import { cmd } from './cmd'

export const basicPageActions: Actions = {
  email,
  github,
  init,
  cmd,
}