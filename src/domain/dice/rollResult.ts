import type { DieFace } from './Die'

export type RolledDice = {
  otherDice: DieFace[]
  wild: {
    rolls: DieFace[]
  }
}

export type ScoredRoll = {
  otherDice: DieFace[]
  wild: {
    rolls: DieFace[]
    total: number
    firstRoll: DieFace
    isComplicationRoll: boolean
    complicationDecision: boolean | null
    penalty: number
    exploded: boolean
  }
  baseTotal: number
  total: number
  highestOther: DieFace | null
}
