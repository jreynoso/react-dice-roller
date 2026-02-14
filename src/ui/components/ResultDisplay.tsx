import styled from 'styled-components'
import DiceFace from './DiceFace'
import { toDisplaySummary } from '../../adapters/mappers/toDisplaySummary'
import type { ScoredRoll } from '../../domain/dice/rollResult'

type ResultDisplayProps = {
  text?: string
  result?: ScoredRoll | null
  onComplicationDecision?: (decision: boolean) => void
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

const TotalOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

const TotalBox = styled.button<{ $isComplication: boolean; $active: boolean }>`
  width: 3rem;
  height: 3rem;
  border: 2px solid
    ${({ $isComplication, $active }) => {
      if ($isComplication && $active) {
        return 'var(--complication)'
      }
      return $active ? '#174ec2' : 'var(--border)'
    }};
  border-radius: 0.75rem;
  display: grid;
  place-items: center;
  font-size: 1.2rem;
  font-weight: 700;
  background: ${({ $isComplication, $active }) => {
    if ($isComplication && $active) {
      return 'var(--complication-secondary)'
    }
    return $active ? '#192c4e' : 'var(--panel)'
  }};
  color: var(--ink);
  flex: 0 0 auto;
  cursor: pointer;
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

const WildRollsRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
`

function ResultDisplay({
  text,
  result,
  onComplicationDecision,
}: ResultDisplayProps) {
  if (result) {
    const formula = `Rolled ${result.otherDice.length + 1}D${result.modifier ? `+${result.modifier}` : ''}`
    const isComplicationRoll = result.wild.isComplicationRoll
    const isComplication = isComplicationRoll && result.wild.complicationDecision === true
    const isNormal = !isComplicationRoll || result.wild.complicationDecision !== true
    const normalTotal = isComplicationRoll
      ? result.baseTotal - (1 + (result.highestOther ?? 0)) + result.modifier
      : result.total
    const complicationTotal = result.baseTotal + result.modifier
    const summary = toDisplaySummary(result)
    const wildExtraRolls = result.wild.rolls.slice(1)
    const subtractsDice = isComplicationRoll && isNormal
    const subtractedOtherIndex = subtractsDice && result.highestOther
      ? result.otherDice.findIndex((value) => value === result.highestOther)
      : -1

    return (
      <ResultWrapper>
        <DiceRow>
          {result.otherDice.map((face, index) => (
            <DiceFace key={`die-${index}`} face={face} disabled={index === subtractedOtherIndex} />
          ))}
          <DiceFace face={result.wild.firstRoll} isWild label="Wild" disabled={subtractsDice} />
        </DiceRow>
        {wildExtraRolls.length > 0 ? (
          <WildRolls>
            <WildRollsRow>
              {wildExtraRolls.map((face, index) => (
                <DiceFace key={`wild-${index}`} face={face} isWild label="Bonus" />
              ))}
            </WildRollsRow>
          </WildRolls>
        ) : null}
        <Callout aria-live="polite">
          <Formula>{formula}</Formula>
          <TotalOptions>
            {isComplicationRoll ? (
              <>
                <TotalBox
                  type="button"
                  $isComplication={false}
                  $active={isNormal}
                  aria-label={`Normal total ${normalTotal}`}
                  onClick={() => onComplicationDecision?.(false)}
                >
                  {normalTotal}
                </TotalBox>
                <TotalBox
                  type="button"
                  $isComplication={true}
                  $active={isComplication}
                  aria-label={`Complication total ${complicationTotal}`}
                  title="complication"
                  onClick={() => onComplicationDecision?.(true)}
                >
                  {complicationTotal}
                </TotalBox>
              </>
            ) : (
              <TotalBox
                type="button"
                $isComplication={false}
                $active={true}
                aria-label={`Total ${result.total}`}
              >
                {result.total}
              </TotalBox>
            )}
          </TotalOptions>
        </Callout>
        {summary.length > 0 ? (
          <RollDetails>
            <RollDetailsSummary>Details</RollDetailsSummary>
            <RollDetailsBody>
              <Summary>
                {summary.map((line, index) => (
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
