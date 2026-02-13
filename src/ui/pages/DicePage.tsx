import styled from 'styled-components'
import DiceFace from '../components/DiceFace'
import ResultDisplay from '../components/ResultDisplay'
import RollButton from '../components/RollButton'
import DiceSelector from '../components/DiceSelector'
import { useDiceRoll } from '../../adapters/state/useDiceRoll'
import { toDisplayText } from '../../adapters/mappers/toDisplayText'
import { toDisplaySummary } from '../../adapters/mappers/toDisplaySummary'

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
  height: 3.5rem;
  border: 1px solid ${({ $active }) => ($active ? 'var(--accent)' : 'var(--border)')};
  border-radius: 999px;
  background: ${({ $active }) => ($active ? 'rgba(245, 214, 76, 0.18)' : 'var(--panel-secondary)')};
  color: ${({ $active }) => ($active ? 'var(--accent)' : 'var(--ink)')};
  padding: 0.4rem 0.9rem;
  font-size: 1rem;
  cursor: pointer;
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

const Summary = styled.div`
  display: grid;
  gap: 0.35rem;
  text-align: center;
  font-size: 0.95rem;
  color: var(--muted);
`

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: var(--overlay);
  display: grid;
  place-items: center;
  padding: 1.5rem;
`

const Modal = styled.div`
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 1.25rem;
  padding: 2rem;
  max-width: 420px;
  width: 100%;
  display: grid;
  gap: 1rem;
  box-shadow: var(--shadow);
`

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`

const ModalBody = styled.p`
  margin: 0;
  color: var(--muted);
`

const ModalActions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
`

const ModalButton = styled.button<{ $primary?: boolean }>`
  border: 1px solid ${({ $primary }) => ($primary ? 'var(--accent)' : 'var(--border)')};
  border-radius: 999px;
  background: ${({ $primary }) => ($primary ? 'var(--accent)' : 'var(--panel-secondary)')};
  color: ${({ $primary }) => ($primary ? 'var(--accent-ink)' : 'var(--ink)')};
  padding: 0.5rem 1.2rem;
  font-size: 0.95rem;
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
    pendingRoll,
    decideComplication,
  } = useDiceRoll()
  const message = pendingRoll
    ? 'Wild die rolled a 1. Decide if this is a complication.'
    : result
      ? toDisplayText(result)
      : 'Roll to see the outcome.'
  const summary = result ? toDisplaySummary(result) : []

  return (
    <Page>
      <Header>
        <Overline>Dice Roller</Overline>
        <h1>Build your pool. Let the wild die ride.</h1>
        <p>Select dice on the 4x3 grid. Boxes fill left to right, top to bottom.</p>
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
          <RollButton onRoll={roll} selectionCount={selectionCount} modifier={modifier} disabled={pendingRoll !== null} />
          <ResultDisplay text={message} />

          {result ? (
            <>
              <DiceRow>
                {result.otherDice.map((face, index) => (
                  <DiceFace key={`die-${index}`} face={face} />
                ))}
                <DiceFace face={result.wild.firstRoll} isWild label="Wild" />
              </DiceRow>

              {result.wild.exploded ? (
                <WildRolls>
                  <WildRollsLabel>Wild extra rolls</WildRollsLabel>
                  <WildRollsRow>
                    {result.wild.rolls.slice(1).map((face, index) => (
                      <DiceFace
                        key={`wild-${index}`}
                        face={face}
                        isWild
                      />
                    ))}
                  </WildRollsRow>
                </WildRolls>
              ) : null}

              <Summary>
                {summary.map((line, index) => (
                  <div key={`${index}-${line}`}>{line}</div>
                ))}
              </Summary>
            </>
          ) : null}
        </Panel>
      </Panels>
      {pendingRoll ? (
        <ModalOverlay>
          <Modal role="dialog" aria-modal="true" aria-label="Complication">
            <ModalTitle>Wild Die Outcome</ModalTitle>
            <ModalBody>
              The wild die rolled a 1 on the first roll.
            </ModalBody>
            <ModalActions>
              <ModalButton type="button" onClick={() => decideComplication(true)}>
                Treat as a complication
              </ModalButton>
              <ModalButton
                type="button"
                $primary
                onClick={() => decideComplication(false)}
              >
                Normal
              </ModalButton>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      ) : null}
    </Page>
  )
}

export default DicePage
