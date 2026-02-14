import styled from 'styled-components'
import ResultDisplay from '../components/ResultDisplay'
import RollButton from '../components/RollButton'
import DiceSelector from '../components/DiceSelector'
import { useDiceRoll } from '../../adapters/state/useDiceRoll'

const Page = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 1.5rem 3.5rem;
`

const Header = styled.header`
  text-align: center;
  max-width: 32rem;

  h1 {
    margin: 0;
    font-size: clamp(2rem, 3vw, 2.75rem);
  }

  p {
    margin: 0.5rem 0 0;
    color: var(--muted);
  }
`

const Overline = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.25rem;
  font-size: 0.75rem;
  margin: 0 0 0.5rem;
  color: var(--muted);
`

const Panels = styled.div`
  display: grid;
  gap: 1.5rem;
  width: min(900px, 100%);

  @media (min-width: 860px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const Panel = styled.section`
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 1.5rem;
  padding: 2rem;
  display: grid;
  gap: 1.5rem;
  justify-items: center;
  box-shadow: var(--shadow);
`

const PanelTitle = styled.h2`
  margin: 0;
  font-size: 1.3rem;
`

const ModifierGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
`

const ModifierButton = styled.button<{ $active: boolean }>`
  height: 3rem;
  border: 1px solid ${({ $active }) => ($active ? 'var(--accent)' : 'var(--border)')};
  border-radius: 999px;
  background: ${({ $active }) => ($active ? 'rgba(245, 214, 76, 0.18)' : 'var(--panel-secondary)')};
  color: ${({ $active }) => ($active ? 'var(--accent)' : 'var(--ink)')};
  padding: 0.4rem 0.9rem;
  font-size: 1rem;
  cursor: pointer;
`

function DicePage() {
  const {
    result,
    roll,
    selectionCount,
    setSelectionCount,
    modifier,
    setModifier,
    setComplicationDecision,
  } = useDiceRoll()
  const message = 'Roll to see the outcome.'

  return (
    <Page>
      <Header>
        <Overline>Dice Roller</Overline>
        <h1>Build your pool. Let the wild die ride.</h1>
        <p>Select dice on the 4x3 grid and simulate rolling that many D6.</p>
      </Header>

      <Panels>
        <Panel>
          <PanelTitle>Select dice</PanelTitle>
          <DiceSelector
            columns={4}
            rows={3}
            selectionCount={selectionCount}
            onSelect={setSelectionCount}
          />
          <ModifierGroup>
            {[0, 1, 2].map((value) => (
              <ModifierButton
                key={value}
                type="button"
                $active={modifier === value}
                onClick={() => setModifier(value)}
              >
                {value === 0 ? 'No modifier' : `+${value}`}
              </ModifierButton>
            ))}
          </ModifierGroup>
        </Panel>

        <Panel>
          <PanelTitle>Roll</PanelTitle>
          <RollButton onRoll={roll} selectionCount={selectionCount} modifier={modifier} />
          <ResultDisplay
            text={message}
            result={result}
            onComplicationDecision={setComplicationDecision}
          />
        </Panel>
      </Panels>
    </Page>
  )
}

export default DicePage
