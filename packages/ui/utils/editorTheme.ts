import { Extension } from '@codemirror/state'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'
import { EditorView } from '@codemirror/view'

import {LRLanguage} from "@codemirror/language"

// Colors from https://www.nordtheme.com/docs/colors-and-palettes
// Polar Night
const base00 = '#000000', // black
  base01 = '#6b6b6b', // dark grey
  base02 = '#c4c4c4',
  base03 = '#b3b3b3' // grey

// Snow Storm
const base04 = '#999999', // grey
  base05 = '#717171', // off white
  base06 = '#8a8a8a' // white

// Frost
const base07 = '#b5cabb', // moss green
  base08 = '#202020', // ice blue
  base09 = '#464646', // water blue
  base0A = '#f8f8f8' // deep blue

// Aurora
const base0b = '#eeeeee', // red
  base0C = '#7c7c7c', // orange
  base0D = '#adadad', // yellow
  base0E = '#c0c0c0', // green
  base0F = '#99ac9e' // purple

const invalid = '#d30102',
  darkBackground = '#000000',
  highlightBackground = base03,
  background = base00,
  tooltipBackground = base01,
  selection = base03,
  cursor = base04

/// The editor theme styles for Nord.
export const nordTheme = EditorView.theme(
  {
    '&': {
      color: base04,
      backgroundColor: background,
      padding: '0.5rem'
    },

    '.cm-content': {
      caretColor: cursor
    },

    '.cm-cursor, .cm-dropCursor': { borderLeftColor: cursor },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      { backgroundColor: selection },

    '.cm-panels': { backgroundColor: darkBackground, color: base03 },
    '.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
    '.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },

    '.cm-searchMatch': {
      backgroundColor: 'transparent',
      outline: `1px solid ${base07}`
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: base04,
      color: base00
    },

    '.cm-activeLine': { backgroundColor: highlightBackground },
    '.cm-selectionMatch': {
      backgroundColor: base05,
      color: base01
    },

    '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
      outline: `1px solid ${base07}`
    },

    '&.cm-focused .cm-matchingBracket': {
      backgroundColor: base06,
      color: base02
    },

    '.cm-gutters': {
      backgroundColor: base00,
      color: base03,
      border: 'none'
    },

    '.cm-activeLineGutter': {
      backgroundColor: highlightBackground,
      color: base04
    },

    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#ddd'
    },

    '.cm-tooltip': {
      border: 'none',
      backgroundColor: tooltipBackground
    },
    '.cm-tooltip .cm-tooltip-arrow:before': {
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent'
    },
    '.cm-tooltip .cm-tooltip-arrow:after': {
      borderTopColor: tooltipBackground,
      borderBottomColor: tooltipBackground
    },
    '.cm-tooltip-autocomplete': {
      '& > ul > li[aria-selected]': {
        backgroundColor: highlightBackground,
        color: base03
      }
    }
  },
  { dark: true }
)


/// The highlighting style for code in the Nord theme.
export const nordHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: base0A },
  {
    tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
    color: base08
  },
  { tag: [t.variableName], color: base07 },
  { tag: [t.function(t.variableName)], color: base07 },
  { tag: [t.labelName], color: base09 },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: base0A
  },
  { tag: [t.definition(t.name), t.separator], color: base0E },
  { tag: [t.brace], color: base07 },
  {
    tag: [t.annotation],
    color: invalid
  },
  {
    tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
    color: base0F
  },
  {
    tag: [t.typeName, t.className],
    color: base0D
  },
  {
    tag: [t.operator, t.operatorKeyword],
    color: base0E
  },
  {
    tag: [t.tagName],
    color: base0F
  },
  {
    tag: [t.squareBracket],
    color: base0b
  },
  {
    tag: [t.angleBracket],
    color: base0C
  },
  {
    tag: [t.attributeName],
    color: base0D
  },
  {
    tag: [t.regexp],
    color: base0A
  },
  {
    tag: [t.quote],
    color: base0F
  },
  { tag: [t.string], color: base0E },
  {
    tag: t.link,
    color: base0E,
    textDecoration: 'underline',
    textUnderlinePosition: 'under'
  },
  {
    tag: [t.url, t.escape, t.special(t.string)],
    color: base07
  },
  { tag: [t.meta], color: base08 },
  { tag: [t.monospace], color: base04, fontStyle: 'italic' },
  { tag: [t.comment], color: base03, fontStyle: 'italic' },
  { tag: t.strong, fontWeight: 'bold', color: base0A },
  { tag: t.emphasis, fontStyle: 'italic', color: base0A },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.heading, fontWeight: 'bold', color: base0A },
  { tag: t.special(t.heading1), fontWeight: 'bold', color: base0A },
  { tag: t.heading1, fontWeight: 'bold', color: base0A },
  {
    tag: [t.heading2, t.heading3, t.heading4],
    fontWeight: 'bold',
    color: base0A
  },
  {
    tag: [t.heading5, t.heading6],
    color: base0A
  },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base0C },
  {
    tag: [t.processingInstruction, t.inserted],
    color: base07
  },
  {
    tag: [t.contentSeparator],
    color: base0D
  },
  { tag: t.invalid, color: base02, borderBottom: `1px dotted ${invalid}` }
])

/// Extension to enable the Nord theme (both the editor theme and
/// the highlight style).
export const nord: Extension = [
  nordTheme,
  syntaxHighlighting(nordHighlightStyle)
]