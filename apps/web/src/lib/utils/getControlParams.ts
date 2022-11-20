import type { BasicPageData, BasicActionData, ControlParams } from '../types'

interface Options {
  action?: string
  placeholder?: string
  value?: string
}

export const getControlParams = (data: BasicPageData, form?: BasicActionData, options?: Options): ControlParams => ({
  ...data,
  ...(form ?? {}),
  ...(options ?? {})
})