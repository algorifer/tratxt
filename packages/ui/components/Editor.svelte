<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { placeholder, EditorView } from '@codemirror/view'
  import { languages } from '@codemirror/language-data'
  import { marked } from 'marked'

  import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
  import { nord } from '../utils/editorTheme'

  export let name: string
  export let value: string = ''
  export let label: string | undefined

  let textarea
  let editor: EditorView | undefined = undefined
  let preview: boolean = false

  onMount(async () => {
    editor = new EditorView({
      doc: value,
      extensions: [
        ...nord,
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true,
          extensions: []
        }),
        placeholder('Markdown supported...'),
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            value = update.state.doc.toString()
          }
        })
      ]
    })

    textarea.parentNode.insertBefore(editor.dom, textarea)
    textarea.style.display = 'none'

    if (textarea.form) {
      textarea.form.addEventListener('submit', () => {
        textarea.value = editor.state.doc.toString()
      })
    }
  })

  onDestroy(() => {
    editor?.destroy()
  })
</script>

<div class="field" title={label} class:editorhide={preview}>
  <div class="head">
    <label for={name}>{label}</label>
    {#if value.length}
      <button on:click={() => (preview = !preview)} type="button">
        {#if preview}
          hide preview
        {:else}
          show preview
        {/if}
      </button>
    {/if}
  </div>
  {#if preview}
    <div class="preview">
      {@html marked(value)}
    </div>
  {/if}
  <textarea
    id={name}
    {name}
    bind:this={textarea}
    bind:value
    aria-label={`${label} input`}
    placeholder="Markdown supported"
    class:hide={preview}
  />
</div>

<style>
  .field {
    position: relative;
    grid-area: var(--area);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .field :global(.cm-scroller) {
    font-family: var(--sans);
  }

  .head {
    display: flex;
  }

  label {
    font-family: var(--mono);
    text-transform: uppercase;
  }

  textarea {
    width: 100%;
    padding: 0.5rem;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    outline: none;
    background: var(--c-back);
    color: var(--c-front);
    border: 1px solid var(--c-back);
    border-bottom: 1px solid var(--c-front);
    box-shadow: 0 0 0 0 var(--c-front);
    transition: 0.2s ease-in-out box-shadow;
  }

  textarea:focus {
    box-shadow: 0 0 0 2px var(--c-front);
    border-bottom: 1px solid var(--c-back);
  }

  .editorhide :global(.cm-editor) {
    display: none !important;
  }

  button {
    padding: 0;
    font-family: var(--mono);
    font-size: inherit;
    font-weight: inherit;
    margin-left: auto;
    background: transparent;
    color: var(--c-front);
    border: none;
  }

  button:hover {
    text-decoration: underline;
  }
</style>
