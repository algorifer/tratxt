import Prism from 'prismjs'
import 'prismjs/components/prism-markdown'

export const highlight = (value: string) => Prism.highlight(value, Prism.languages.markdown, 'md')