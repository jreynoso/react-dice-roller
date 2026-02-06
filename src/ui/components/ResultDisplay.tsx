type ResultDisplayProps = {
  text: string
}

function ResultDisplay({ text }: ResultDisplayProps) {
  return <p className="result-display">{text}</p>
}

export default ResultDisplay
