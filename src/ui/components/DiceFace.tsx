import type { DieFace } from '../../domain/dice/Die'

type DiceFaceProps = {
  face: DieFace | null
}

function DiceFace({ face }: DiceFaceProps) {
  return (
    <div className="dice-face" aria-live="polite">
      {face ?? '-'}
    </div>
  )
}

export default DiceFace
