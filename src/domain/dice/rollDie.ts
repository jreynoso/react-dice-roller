import type { DieFace } from './Die'

export type RandomIntFn = (min: number, max: number) => number

export function rollDie(randomInt: RandomIntFn): DieFace {
  const value = randomInt(1, 6)
  if (value < 1 || value > 6) {
    throw new Error(`Invalid die roll: ${value}`)
  }

  return value as DieFace
}
