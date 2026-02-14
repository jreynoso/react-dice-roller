import type { ScoredRoll } from '../../domain/dice/rollResult'

function formatDice(values: number[]): string {
  if (values.length === 0) {
    return 'none'
  }

  return values.join(' + ')
}

export function toDisplaySummary(result: ScoredRoll): string[] {
  const lines: string[] = []
  const otherTotal = result.otherDice.reduce((sum, value) => sum + value, 0)
  const singleWildDie = result.wild.rolls.length === 1
  const wildDieLabel = singleWildDie ? 'die' : 'dice'
  const wildDice = singleWildDie ? result.wild.total : `${formatDice(result.wild.rolls)} = ${result.wild.total}`
  const wildLine = `Wild ${wildDieLabel}: ${wildDice}`
  const otherDice = `${formatDice(result.otherDice)}`
  const otherLine =
    result.otherDice.length > 0
      ? `Other dice: ${otherDice} = ${otherTotal}`
      : 'Other dice: none'

  lines.push(otherLine)

  if (result.wild.isComplicationRoll) {
    if (result.wild.complicationDecision === true) {
      lines.push(`Wild die (complication): ${wildDice}`)
    } else if (result.wild.complicationDecision === false) {
      const highest = result.highestOther ?? 0
      lines.push(
        `Wild die (ignore and subtract highest): -${highest}`,
      )
    }
  } else {
    lines.push(wildLine)
  }

  if (result.modifier !== 0) {
    lines.push(`Modifier: +${result.modifier}`)
  }

  return lines
}
