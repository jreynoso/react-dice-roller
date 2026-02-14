import styled from 'styled-components'
import type { DieFace } from '../../domain/dice/Die'

type DiceFaceProps = {
  face: DieFace | null
  isWild?: boolean
  label?: string
  disabled?: boolean
}

const Face = styled.div<{ $isWild: boolean; $disabled: boolean }>`
  width: 3rem;
  height: 3rem;
  border: 2px solid ${({ $isWild }) => ($isWild ? 'var(--wild-border)' : 'var(--border)')};
  border-radius: 0.6rem;
  display: grid;
  place-items: center;
  font-size: 1.4rem;
  font-weight: 700;
  background: ${({ $isWild }) => ($isWild ? 'var(--wild-bg)' : 'var(--panel-secondary)')};
  color: ${({ $isWild }) => ($isWild ? 'var(--wild-ink)' : 'var(--ink)')};
  opacity: ${({ $disabled }) => ($disabled ? 0.45 : 1)};
`

const Label = styled.span<{ $disabled: boolean }>`
  font-size: 0.6rem;
  letter-spacing: 0.12rem;
  text-transform: uppercase;
  color: var(--muted);
  opacity: ${({ $disabled }) => ($disabled ? 0.55 : 1)};
`

const Wrapper = styled.div`
  display: grid;
  gap: 0.35rem;
  justify-items: center;
`

function DiceFace({ face, isWild = false, label, disabled = false }: DiceFaceProps) {
  return (
    <Wrapper aria-live="polite">
      <Face $isWild={isWild} $disabled={disabled}>{face ?? '-'}</Face>
      {label ? <Label $disabled={disabled}>{label}</Label> : null}
    </Wrapper>
  )
}

export default DiceFace
