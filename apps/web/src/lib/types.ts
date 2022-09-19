export interface Base {
  user: User
  docs: Doc[]
  times: TimeRecord[]
  tags: Tag[]
  reports: Report[]
  current: CurrentTime | null
}

export interface User {
  name: string
  fullName: string
  links: string[]
}

export interface Doc {
  id: string
  title: string
  parent: string[]
  content: string
  author: string
  assigned: string
  createdAt: number
  updatedAt: number
  inProgress: boolean
  estimate: number | null
  perDay: number | null
  tags: string[]
}

export interface TimeRecord {
  id: string
  start: number | null
  time: number
  rate: Rate
  doc: string | null
  report: string | null
  tags: string[]
}

export interface Tag {
  id: string
  name: string
  emoji: string
}

export interface Report {
  id: string
  content: string
  doc: string | null
  tags: string[]
  rate: Rate
  createdAt: number
}

export enum Rate {
  Bad,
  Ok,
  Good
}

export interface CurrentTime {
  start: number
  doc: string | null
  report: string
  tags: string[]
  rate: Rate
}