import styled from 'styled-components'
import type { DieFace } from '../../domain/dice/Die'

type DiceFaceProps = {
  face: DieFace | null
}

const Face = styled.div`
  width: 6rem;
  height: 6rem;
  border: 2px solid var(--ink);
  border-radius: 1rem;
  display: grid;
  place-items: center;
  font-size: 2.5rem;
  font-weight: 700;
  background: #fffaf2;
`

function DiceFace({ face }: DiceFaceProps) {
  return (
    <Face aria-live="polite">
      {face ?? '-'}
    </Face>
  )
}

export default DiceFace
