import { rollDie, type RandomIntFn } from '../../domain/dice/rollDie'
import type { RolledDice } from '../../domain/dice/rollResult'

function rollWild(randomInt: RandomIntFn): RolledDice['wild'] {
  const rolls = [rollDie(randomInt)]

  while (rolls[rolls.length - 1] === 6) {
    const next = rollDie(randomInt)
    rolls.push(next)

    if (next !== 6) {
      break
    }
  }

  return { rolls }
}

export function rollDice(randomInt: RandomIntFn, count: number): RolledDice {
  if (count < 1) {
    throw new Error('Must roll at least one die.')
  }

  const otherDiceCount = Math.max(count - 1, 0)
  const otherDice = Array.from({ length: otherDiceCount }, () => rollDie(randomInt))
  const wild = rollWild(randomInt)

  return { otherDice, wild }
}
