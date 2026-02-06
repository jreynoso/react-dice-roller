import styled from 'styled-components'
import DiceFace from '../components/DiceFace'
import ResultDisplay from '../components/ResultDisplay'
import RollButton from '../components/RollButton'
import { useDiceRoll } from '../../adapters/state/useDiceRoll'
import { toDisplayText } from '../../adapters/mappers/toDisplayText'

const Page = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
`

const Overline = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.25rem;
  font-size: 0.75rem;
  margin: 0 0 0.5rem;
  color: #6f604b;
`

const Panel = styled.section`
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 1.5rem;
  padding: 2.5rem;
  display: grid;
  gap: 1.5rem;
  justify-items: center;
  box-shadow: var(--shadow);
`

function DicePage() {
  const { result, roll } = useDiceRoll()
  const message = result ? toDisplayText(result) : 'Roll to see the outcome.'

  return (
    <Page>
      <Header>
        <Overline>D6 Roller</Overline>
        <h1>Single roll.</h1>
      </Header>

      <Panel>
        <DiceFace face={result?.face ?? null} />
        <ResultDisplay text={message} />
        <RollButton onRoll={roll} />
      </Panel>
    </Page>
  )
}

export default DicePage
