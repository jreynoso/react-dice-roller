import styled from 'styled-components'
import type { DieFace } from '../../domain/dice/Die'

type DiceFaceProps = {
  face: DieFace | null
  isWild?: boolean
  label?: string
}

const Face = styled.div<{ $isWild: boolean }>`
  width: 3.5rem;
  height: 3.5rem;
  border: 2px solid ${({ $isWild }) => ($isWild ? 'var(--wild-border)' : 'var(--border)')};
  border-radius: 0.85rem;
  display: grid;
  place-items: center;
  font-size: 1.4rem;
  font-weight: 700;
  background: ${({ $isWild }) => ($isWild ? 'var(--wild-bg)' : 'var(--panel-secondary)')};
  color: ${({ $isWild }) => ($isWild ? 'var(--wild-ink)' : 'var(--ink)')};
`

const Label = styled.span`
  font-size: 0.7rem;
  letter-spacing: 0.12rem;
  text-transform: uppercase;
  color: var(--muted);
`

const Wrapper = styled.div`
  display: grid;
  gap: 0.35rem;
  justify-items: center;
`

function DiceFace({ face, isWild = false, label }: DiceFaceProps) {
  return (
    <Wrapper aria-live="polite">
      <Face $isWild={isWild}>{face ?? '-'}</Face>
      {label ? <Label>{label}</Label> : null}
    </Wrapper>
  )
}

export default DiceFace
