import type { DieFace } from './Die'

export type RollResult = {
  face: DieFace
}

export function createRollResult(face: DieFace): RollResult {
  return { face }
}
