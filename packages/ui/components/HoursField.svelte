<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import TimeCount from './TimeCount.svelte'

  type InputEvent = Event & {
    currentTarget: EventTarget & HTMLInputElement
  }

  export let name: string
  export let label: string | undefined = undefined
  export let value: number
  export let max: number | undefined = undefined
  export let daySize: number = 24

  let inputValue: string = ''

  $: if (isNaN(value)) {
    inputValue = ''
  } else {
    inputValue = value.toString()
  }

  const dispatch = createEventDispatcher()

  const input = (e: InputEvent) => {
    if (isNaN(e.currentTarget.valueAsNumber)) {
      inputValue = e.currentTarget.value
      return
    }

    value = e.currentTarget.valueAsNumber
    dispatch('change', e.currentTarget.valueAsNumber)
  }

  const change = (e: InputEvent) => {
    const nextValue = isNaN(e.currentTarget.valueAsNumber) ? 0 : e.currentTarget.valueAsNumber
    value = nextValue
    dispatch('change', nextValue)
  }
</script>

<div class="wrapper" style={`--value-length: ${inputValue.length}`}>
  <div class="field">
    {#if label}
      <label for={name}>{label}</label>
    {/if}
    <input
      id={name}
      {name}
      type="number"
      value={inputValue}
      min={0}
      {max}
      on:input={input}
      on:change={change}
    />
    <span class="arrow">→</span>
  </div>
  <TimeCount {value} {daySize} />
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .field {
    display: flex;
    flex-direction: row-reverse;
    justify-content: start;
    align-items: end;
  }

  label {
    display: inline-block;
    margin-bottom: 0.25rem;
  }

  input {
    width: calc(var(--value-length) * 1.2rem + 0.5rem);
    padding: 0;
    margin-left: 1rem;
    font-family: inherit;
    font-size: 2rem;
    color: inherit;
    background: none;
    border: none;
    outline: none;
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .arrow {
    margin-bottom: 0.25rem;
    padding: 0.5rem;
    font-weight: 600;
    opacity: 0.5;
  }

  input:hover ~ .arrow {
    opacity: 1;
  }

  input:focus ~ .arrow {
    opacity: 1;
    color: var(--c-back);
    background: var(--c-front);
  }
</style>
