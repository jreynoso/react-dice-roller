import type { ScoredRoll } from '../../domain/dice/rollResult'

export function toDisplayText(result: ScoredRoll): string {
  const diceCount = result.otherDice.length + 1
  return `Rolled ${diceCount} dice. Total: ${result.total}.`
}
