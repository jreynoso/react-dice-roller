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
  const wildLine = `Wild die: ${formatDice(result.wild.rolls)} = ${result.wild.total}`
  const otherLine =
    result.otherDice.length > 0
      ? `Other dice: ${formatDice(result.otherDice)} = ${otherTotal}`
      : 'Other dice: none'

  lines.push(otherLine)
  lines.push(wildLine)

  if (result.wild.isComplicationRoll) {
    if (result.wild.complicationDecision === true) {
      lines.push('Complication: add normally.')
    } else if (result.wild.complicationDecision === false) {
      const highest = result.highestOther ?? 0
      lines.push(
        `No complication: subtract 1 + highest (${highest}) = -${result.wild.penalty}`,
      )
    }
  }

  if (result.modifier !== 0) {
    lines.push(`Modifier: +${result.modifier}`)
  }

  lines.push(`Total: ${result.total}`)

  return lines
}
