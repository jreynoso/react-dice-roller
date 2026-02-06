import DiceFace from '../components/DiceFace'
import ResultDisplay from '../components/ResultDisplay'
import RollButton from '../components/RollButton'
import { useDiceRoll } from '../../adapters/state/useDiceRoll'
import { toDisplayText } from '../../adapters/mappers/toDisplayText'

function DicePage() {
  const { result, roll } = useDiceRoll()
  const message = result ? toDisplayText(result) : 'Roll to see the outcome.'

  return (
    <main className="dice-page">
      <header className="dice-header">
        <p className="overline">D6 Roller</p>
        <h1>Single roll.</h1>
      </header>

      <section className="dice-panel">
        <DiceFace face={result?.face ?? null} />
        <ResultDisplay text={message} />
        <RollButton onRoll={roll} />
      </section>
    </main>
  )
}

export default DicePage
