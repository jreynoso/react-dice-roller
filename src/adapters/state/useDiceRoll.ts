import { useCallback, useState } from 'react'
import { rollDice } from '../../features/rollDice/rollDice'
import { randomInt } from '../../infrastructure/rng/randomInt'
import type { ScoredRoll } from '../../domain/dice/rollResult'
import { scoreRoll } from '../../domain/dice/scoreRoll'

export type DiceSelection = {
  columns: number
  rows: number
}

export type DiceRollState = {
  result: ScoredRoll | null
  roll: () => void
  selection: DiceSelection
  setSelection: (selection: DiceSelection) => void
  selectedCount: number
}

const defaultSelection: DiceSelection = { columns: 1, rows: 1 }

export function useDiceRoll(): DiceRollState {
  const [result, setResult] = useState<ScoredRoll | null>(null)
  const [selection, setSelection] = useState<DiceSelection>(defaultSelection)
  const selectedCount = selection.columns * selection.rows

  const roll = useCallback(() => {
    const rolled = rollDice(randomInt, selectedCount)
    let complicationDecision: boolean | null = null

    if (rolled.wild.rolls[0] === 1) {
      complicationDecision = window.confirm(
        'Wild die rolled a 1. Is it a complication?',
      )
    }

    setResult(scoreRoll(rolled, complicationDecision))
  }, [selectedCount])

  return { result, roll, selection, setSelection, selectedCount }
}
