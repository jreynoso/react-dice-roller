import { useCallback, useState } from 'react'
import { rollDice } from '../../features/rollDice/rollDice'
import { randomInt } from '../../infrastructure/rng/randomInt'
import type { RollResult } from '../../domain/dice/rollResult'

export type DiceRollState = {
  result: RollResult | null
  roll: () => void
}

export function useDiceRoll(): DiceRollState {
  const [result, setResult] = useState<RollResult | null>(null)

  const roll = useCallback(() => {
    setResult(rollDice(randomInt))
  }, [])

  return { result, roll }
}
