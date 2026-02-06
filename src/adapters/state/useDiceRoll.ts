import { useCallback, useState } from 'react'
import { rollDice } from '../../features/rollDice/rollDice'
import { randomInt } from '../../infrastructure/rng/randomInt'
import type { RolledDice, ScoredRoll } from '../../domain/dice/rollResult'
import { scoreRoll } from '../../domain/dice/scoreRoll'

export type DiceRollState = {
  result: ScoredRoll | null
  roll: () => void
  selectionCount: number
  setSelectionCount: (count: number) => void
  modifier: number
  setModifier: (value: number) => void
  pendingRoll: RolledDice | null
  decideComplication: (decision: boolean) => void
}

const defaultSelectionCount = 5
const defaultModifier = 0

export function useDiceRoll(): DiceRollState {
  const [result, setResult] = useState<ScoredRoll | null>(null)
  const [selectionCount, setSelectionCount] = useState(defaultSelectionCount)
  const [modifier, setModifier] = useState(defaultModifier)
  const [pending, setPending] = useState<{
    rolled: RolledDice
    modifier: number
  } | null>(null)

  const roll = useCallback(() => {
    const rolled = rollDice(randomInt, selectionCount)
    setResult(null)

    if (rolled.wild.rolls[0] === 1) {
      setPending({ rolled, modifier })
      return
    }

    setPending(null)
    setResult(scoreRoll(rolled, null, modifier))
  }, [selectionCount, modifier])

  const decideComplication = useCallback(
    (decision: boolean) => {
      if (!pending) {
        return
      }

      setResult(scoreRoll(pending.rolled, decision, pending.modifier))
      setPending(null)
    },
    [pending],
  )

  return {
    result,
    roll,
    selectionCount,
    setSelectionCount,
    modifier,
    setModifier,
    pendingRoll: pending?.rolled ?? null,
    decideComplication,
  }
}
