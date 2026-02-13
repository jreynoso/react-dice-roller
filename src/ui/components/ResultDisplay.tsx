import styled from 'styled-components'
import DiceFace from './DiceFace'
import { toDisplaySummary } from '../../adapters/mappers/toDisplaySummary'
import type { ScoredRoll } from '../../domain/dice/rollResult'

type ResultDisplayProps = {
  text?: string
  result?: ScoredRoll | null
}

const Text = styled.p`
  margin: 0;
  font-size: 1.1rem;
`

const Callout = styled.div`
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 1rem;
  background: var(--panel-secondary);
  padding: 0.85rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
`

const Formula = styled.p`
  margin: 0;
  font-size: 1rem;
  color: var(--muted);
`

const TotalBox = styled.div`
  width: 3rem;
  height: 3rem;
  border: 2px solid var(--border);
  border-radius: 0.75rem;
  display: grid;
  place-items: center;
  font-size: 1.2rem;
  font-weight: 700;
  background: var(--panel);
  color: var(--ink);
  flex: 0 0 auto;
`

const RollDetails = styled.details`
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 1rem;
  background: var(--panel-secondary);
  padding: 0.85rem 1rem;
`

const RollDetailsSummary = styled.summary`
  cursor: pointer;
  font-weight: 600;
  user-select: none;
`

const RollDetailsBody = styled.div`
  margin-top: 0.9rem;
`

const Summary = styled.div`
  display: grid;
  gap: 0.35rem;
  text-align: center;
  font-size: 0.95rem;
  color: var(--muted);
`

const ResultWrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 0.9rem;
`

const DiceRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
`

const WildRolls = styled.div`
  display: grid;
  gap: 0.5rem;
  justify-items: center;
`

const WildRollsLabel = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: var(--muted);
`

const WildRollsRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
`

function ResultDisplay({
  text,
  result,
}: ResultDisplayProps) {
  if (result) {
    const formula = `Rolled ${result.otherDice.length + 1}D6${result.modifier ? `+${result.modifier}` : ''}`
    const summary = toDisplaySummary(result)
    const summaryStartIndex = summary.findIndex((line) => line.startsWith('Other dice'))
    const detailLines = summaryStartIndex >= 0 ? summary.slice(summaryStartIndex) : summary
    const wildExtraRolls = result.wild.rolls.slice(1)

    return (
      <ResultWrapper>
        <DiceRow>
          {result.otherDice.map((face, index) => (
            <DiceFace key={`die-${index}`} face={face} />
          ))}
          <DiceFace face={result.wild.firstRoll} isWild label="Wild" />
        </DiceRow>
        {wildExtraRolls.length > 0 ? (
          <WildRolls>
            <WildRollsLabel>Wild extra rolls</WildRollsLabel>
            <WildRollsRow>
              {wildExtraRolls.map((face, index) => (
                <DiceFace key={`wild-${index}`} face={face} isWild />
              ))}
            </WildRollsRow>
          </WildRolls>
        ) : null}
        <Callout aria-live="polite">
          <Formula>{formula}</Formula>
          <TotalBox aria-label={`Total ${result.total}`}>{result.total}</TotalBox>
        </Callout>
        {detailLines.length > 0 ? (
          <RollDetails>
            <RollDetailsSummary>Details</RollDetailsSummary>
            <RollDetailsBody>
              <Summary>
                {detailLines.map((line, index) => (
                  <div key={`${index}-${line}`}>{line}</div>
                ))}
              </Summary>
            </RollDetailsBody>
          </RollDetails>
        ) : null}
      </ResultWrapper>
    )
  }

  return <Text>{text ?? ''}</Text>
}

export default ResultDisplay
