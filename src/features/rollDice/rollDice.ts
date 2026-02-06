import { rollDie, type RandomIntFn } from '../../domain/dice/rollDie'
import { createRollResult, type RollResult } from '../../domain/dice/rollResult'

export function rollDice(randomInt: RandomIntFn): RollResult {
  const face = rollDie(randomInt)
  return createRollResult(face)
}
