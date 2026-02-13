import styled from 'styled-components'

type ResultDisplayProps = {
  text?: string
  formula?: string
  total?: number
  detailLines?: string[]
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

function ResultDisplay({ text, formula, total, detailLines = [] }: ResultDisplayProps) {
  if (formula && typeof total === 'number') {
    return (
      <ResultWrapper>
        <Callout aria-live="polite">
          <Formula>{formula}</Formula>
          <TotalBox aria-label={`Total ${total}`}>{total}</TotalBox>
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
