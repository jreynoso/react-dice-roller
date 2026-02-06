import { useCallback, useState } from 'react'
import { rollDice } from '../../features/rollDice/rollDice'
import { randomInt } from '../../infrastructure/rng/randomInt'
import type { ScoredRoll } from '../../domain/dice/rollResult'
import { scoreRoll } from '../../domain/dice/scoreRoll'

export type DiceRollState = {
  result: ScoredRoll | null
  roll: () => void
  selectionCount: number
  setSelectionCount: (count: number) => void
}

const defaultSelectionCount = 5

export function useDiceRoll(): DiceRollState {
  const [result, setResult] = useState<ScoredRoll | null>(null)
  const [selectionCount, setSelectionCount] = useState(defaultSelectionCount)

  const roll = useCallback(() => {
    const rolled = rollDice(randomInt, selectionCount)
    let complicationDecision: boolean | null = null

    if (rolled.wild.rolls[0] === 1) {
      complicationDecision = window.confirm(
        'Wild die rolled a 1. Is it a complication?',
      )
    }

    setResult(scoreRoll(rolled, complicationDecision))
  }, [selectionCount])

  return { result, roll, selectionCount, setSelectionCount }
}
