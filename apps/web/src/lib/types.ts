import type { ValidationError } from '@sveltejs/kit'

export interface BasicPageData extends Record<string, unknown> {
  userId?: string
  userName?: string
}

export interface BasicActionData extends Record<string, unknown> {
  cmdValue?: string
  cmdError?: string
  authError?: string
  authSuccess?: boolean
  initError?: string
}

export type ActionResult = Promise<ValidationError<BasicActionData> | BasicActionData>

export interface ControlParams {
  userId?: string
  userName?: string
  tracker?: string
  action?: string
  placeholder?: string
  cmdValue?: string
  cmdError?: string
  success?: boolean
  authError?: string
  authSuccess?: boolean
  initError?: string
}