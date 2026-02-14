import styled from 'styled-components'

type RollButtonProps = {
  onRoll: () => void
  selectionCount: number
  modifier: number
  disabled?: boolean
}

const Button = styled.button`
  border: none;
  border-radius: 999px;
  background: var(--accent);
  color: var(--accent-ink);
  font-size: 1rem;
  padding: 0.75rem 2rem;
  height: 3rem;
  cursor: pointer;
  box-shadow: 0 0 18px var(--panel-box-shadow);

  &:hover {
    filter: brightness(1.06);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    filter: none;
  }
`

function RollButton({ onRoll, selectionCount, modifier, disabled = false }: RollButtonProps) {
  const panelTitle = `${selectionCount ? ' ' + selectionCount + 'D' + (modifier ? '+' + modifier : '') : 'the die'}`
  return (
    <Button type="button" onClick={onRoll} disabled={disabled}>
      Roll {panelTitle}
    </Button>
  )
}

export default RollButton
