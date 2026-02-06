import styled from 'styled-components'

type ResultDisplayProps = {
  text: string
}

const Text = styled.p`
  margin: 0;
  font-size: 1.1rem;
`

function ResultDisplay({ text }: ResultDisplayProps) {
  return <Text>{text}</Text>
}

export default ResultDisplay
