import type { ScoredRoll } from '../../domain/dice/rollResult'

export function toDisplayText(result: ScoredRoll): string {
  const diceCount = result.otherDice.length + 1
  const modifier = result.modifier
  return `Rolled ${diceCount}D6${(modifier ? `+${modifier}` : '')}. Total: ${result.total}.`
}
