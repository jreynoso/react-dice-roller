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
  setComplicationDecision: (decision: boolean) => void
}

const defaultSelectionCount = 5
const defaultModifier = 0

export function useDiceRoll(): DiceRollState {
  const [result, setResult] = useState<ScoredRoll | null>(null)
  const [selectionCount, setSelectionCountState] = useState(defaultSelectionCount)
  const [modifier, setModifierState] = useState(defaultModifier)
  const [activeRoll, setActiveRoll] = useState<{
    rolled: RolledDice
    modifier: number
  } | null>(null)

  const setSelectionCount = useCallback((count: number) => {
    setSelectionCountState((current) => {
      if (current === count) {
        return current
      }

      setActiveRoll(null)
      setResult(null)
      return count
    })
  }, [])

  const setModifier = useCallback((value: number) => {
    setModifierState((current) => {
      if (current === value) {
        return current
      }

      setActiveRoll(null)
      setResult(null)
      return value
    })
  }, [])

  const roll = useCallback(() => {
    const rolled = rollDice(randomInt, selectionCount)
    const isComplicationRoll = rolled.wild.rolls[0] === 1
    const initialDecision = isComplicationRoll ? false : null

    setActiveRoll({ rolled, modifier })
    setResult(scoreRoll(rolled, initialDecision, modifier))
  }, [selectionCount, modifier])

  const setComplicationDecision = useCallback(
    (decision: boolean) => {
      if (!activeRoll || activeRoll.rolled.wild.rolls[0] !== 1) {
        return
      }

      setResult(scoreRoll(activeRoll.rolled, decision, activeRoll.modifier))
    },
    [activeRoll],
  )

  return {
    result,
    roll,
    selectionCount,
    setSelectionCount,
    modifier,
    setModifier,
    setComplicationDecision,
  }
}
