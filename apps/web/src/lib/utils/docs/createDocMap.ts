interface Docs {
  name: string
  parents: string[]
}

export interface DocMap {
  name: string
  parents: string[]
  children: string[]
  brothers: string[]
}

export const createDocMap = (docs: Docs[]): DocMap[] => docs.map(({ name, parents }) => {
  const brothers = docs.filter((it) => {
    if (parents.length === 0) return it.parents.length === 0
    return it.parents.includes(parents[0])
  }).map((it) => it.name)
  const children = docs.filter((it) => it.parents.includes(name)).map((it) => it.name)

  return {
    name,
    parents,
    brothers,
    children,
  }
})