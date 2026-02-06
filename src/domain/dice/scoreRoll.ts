import type { DieFace } from './Die'
import type { RolledDice, ScoredRoll } from './rollResult'

function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0)
}

function maxDie(values: DieFace[]): DieFace | null {
  if (values.length === 0) {
    return null
  }

  return values.reduce((max, value) => (value > max ? value : max), values[0])
}

export function scoreRoll(
  rolled: RolledDice,
  complicationDecision: boolean | null,
  modifier: number,
): ScoredRoll {
  const firstRoll = rolled.wild.rolls[0]
  const wildTotal = sum(rolled.wild.rolls)
  const otherTotal = sum(rolled.otherDice)
  const baseTotal = otherTotal + wildTotal
  const highestOther = maxDie(rolled.otherDice)
  const isComplicationRoll = firstRoll === 1
  const exploded = rolled.wild.rolls.length > 1

  let penalty = 0
  let total = baseTotal + modifier
  const decision = complicationDecision

  if (isComplicationRoll && decision === false) {
    penalty = 1 + (highestOther ?? 0)
    total = baseTotal - penalty + modifier
  }

  return {
    otherDice: rolled.otherDice,
    wild: {
      rolls: rolled.wild.rolls,
      total: wildTotal,
      firstRoll,
      isComplicationRoll,
      complicationDecision: decision,
      penalty,
      exploded,
    },
    baseTotal,
    total,
    highestOther,
    modifier,
  }
}
