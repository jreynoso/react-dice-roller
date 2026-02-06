import styled from 'styled-components'

type DiceSelectorProps = {
  columns: number
  rows: number
  selectionCount: number
  onSelect: (count: number) => void
}

const Selector = styled.section`
  display: grid;
  gap: 1rem;
  justify-items: center;
`

const Grid = styled.div<{ $columns: number; $rows: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, 2.5rem);
  grid-template-rows: repeat(${({ $rows }) => $rows}, 2.5rem);
  gap: 0.5rem;
`

const Cell = styled.button<{
  $selected: boolean
}>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.6rem;
  border: 2px solid ${({ $selected }) => ($selected ? '#b24b1f' : '#d6cbbb')};
  background: ${({ $selected }) => ($selected ? '#fff1e2' : '#fffaf2')};
  cursor: pointer;
`

const Count = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: #6f604b;
`

function DiceSelector({
  columns,
  rows,
  selectionCount,
  onSelect,
}: DiceSelectorProps) {
  const totalCells = columns * rows

  return (
    <Selector>
      <Grid $columns={columns} $rows={rows} role="grid" aria-label="Dice selection">
        {Array.from({ length: totalCells }, (_, index) => {
          const count = index + 1
          const isSelected = count <= selectionCount

          return (
            <Cell
              key={count}
              type="button"
              role="gridcell"
              aria-selected={isSelected}
              $selected={isSelected}
              onClick={() => onSelect(count)}
            />
          )
        })}
      </Grid>

      <Count>Selected dice: {selectionCount}</Count>
    </Selector>
  )
}

export default DiceSelector
