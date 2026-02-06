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
    color: #6f604b;
  }
`

const Overline = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.25rem;
  font-size: 0.75rem;
  margin: 0 0 0.5rem;
  color: #6f604b;
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
  border: 1px solid ${({ $active }) => ($active ? '#b24b1f' : '#d6cbbb')};
  border-radius: 999px;
  background: ${({ $active }) => ($active ? '#fff1e2' : '#fffaf2')};
  padding: 0.4rem 0.9rem;
  font-size: 0.9rem;
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
  color: #6f604b;
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
  color: #3b3126;
`

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(18, 14, 10, 0.35);
  display: grid;
  place-items: center;
  padding: 1.5rem;
`

const Modal = styled.div`
  background: #fffaf2;
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
  color: #3b3126;
`

const ModalActions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
`

const ModalButton = styled.button<{ $primary?: boolean }>`
  border: 1px solid ${({ $primary }) => ($primary ? '#b24b1f' : '#d6cbbb')};
  border-radius: 999px;
  background: ${({ $primary }) => ($primary ? '#b24b1f' : '#fffaf2')};
  color: ${({ $primary }) => ($primary ? '#fffaf2' : '#3b3126')};
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
          <p>Rolling {selectionCount} dice.</p>
        </Panel>

        <Panel>
          <PanelTitle>Roll</PanelTitle>
          <RollButton onRoll={roll} disabled={pendingRoll !== null} />
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
            <ModalTitle>Complication?</ModalTitle>
            <ModalBody>
              The wild die rolled a 1 on the first roll. Is this a complication?
            </ModalBody>
            <ModalActions>
              <ModalButton type="button" onClick={() => decideComplication(true)}>
                Yes, complication
              </ModalButton>
              <ModalButton
                type="button"
                $primary
                onClick={() => decideComplication(false)}
              >
                No, subtract
              </ModalButton>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      ) : null}
    </Page>
  )
}

export default DicePage
