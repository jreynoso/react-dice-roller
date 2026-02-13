import styled from 'styled-components'

type ResultDisplayProps = {
  text?: string
  formula?: string
  total?: number
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

function ResultDisplay({ text, formula, total }: ResultDisplayProps) {
  if (formula && typeof total === 'number') {
    return (
      <Callout aria-live="polite">
        <Formula>{formula}</Formula>
        <TotalBox aria-label={`Total ${total}`}>{total}</TotalBox>
      </Callout>
    )
  }

  return <Text>{text ?? ''}</Text>
}

export default ResultDisplay
