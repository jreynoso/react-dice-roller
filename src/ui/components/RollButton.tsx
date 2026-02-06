import styled from 'styled-components'

type RollButtonProps = {
  onRoll: () => void
  disabled?: boolean
}

const Button = styled.button`
  border: none;
  border-radius: 999px;
  background: var(--accent);
  color: #fffaf2;
  font-size: 1rem;
  padding: 0.75rem 2rem;
  cursor: pointer;

  &:hover {
    filter: brightness(0.95);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    filter: none;
  }
`

function RollButton({ onRoll, disabled = false }: RollButtonProps) {
  return (
    <Button type="button" onClick={onRoll} disabled={disabled}>
      Roll the die
    </Button>
  )
}

export default RollButton
