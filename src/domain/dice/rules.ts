import type { DieFace } from './Die'

export function isMaxRoll(face: DieFace): boolean {
  return face === 6
}
