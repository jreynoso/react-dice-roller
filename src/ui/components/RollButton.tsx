type RollButtonProps = {
  onRoll: () => void
}

function RollButton({ onRoll }: RollButtonProps) {
  return (
    <button className="roll-button" type="button" onClick={onRoll}>
      Roll the die
    </button>
  )
}

export default RollButton
