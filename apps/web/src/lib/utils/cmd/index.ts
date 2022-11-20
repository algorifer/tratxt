import { invalid } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'
import type { ActionResult } from '../../types'
import { addRecord } from './addRecord'
import { editName } from './editName'
import { editDescription } from './editDescription'
import { editSite } from './editSite'

export const cmd = async (event: RequestEvent): ActionResult => {
  const formData = await event.request.formData()
  const message = formData.get('message')?.toString()
  if (!message) return invalid(500, {})

  const [command] = message.split(' ')

  switch (command) {
    case 'edit:name':
      return editName(event, message)
    case 'edit:desc':
      return editDescription(event, message)
    case 'edit:site':
      return editSite(event, message)
    default:
      return addRecord(event, message)
  }

}