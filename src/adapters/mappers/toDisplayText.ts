import type { RollResult } from '../../domain/dice/rollResult'
import { isMaxRoll } from '../../domain/dice/rules'

export function toDisplayText(result: RollResult): string {
  if (isMaxRoll(result.face)) {
    return 'Critical! You rolled a 6.'
  }

  return `You rolled a ${result.face}.`
}
