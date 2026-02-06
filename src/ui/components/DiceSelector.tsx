import { useMemo, useState } from 'react'
import styled from 'styled-components'
import type { DiceSelection } from '../../adapters/state/useDiceRoll'

type DiceSelectorProps = {
  columns: number
  rows: number
  selection: DiceSelection
  onSelect: (selection: DiceSelection) => void
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

const Cell = styled.div<{ $selected: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.6rem;
  border: 2px solid ${({ $selected }) => ($selected ? '#b24b1f' : '#d6cbbb')};
  background: ${({ $selected }) => ($selected ? '#fff1e2' : '#fffaf2')};
`

const Count = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: #6f604b;
`

function DiceSelector({ columns, rows, selection, onSelect }: DiceSelectorProps) {
  const [dragging, setDragging] = useState(false)

  const cells = useMemo(() => {
    return Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: columns }, (_, colIndex) => ({
        row: rowIndex + 1,
        column: colIndex + 1,
      })),
    )
  }, [columns, rows])

  const handleSelect = (row: number, column: number) => {
    onSelect({ rows: row, columns: column })
  }

  const selectedCount = selection.columns * selection.rows

  return (
    <Selector>
      <Grid
        $columns={columns}
        $rows={rows}
        role="grid"
        aria-label="Dice selection"
        onPointerUp={() => setDragging(false)}
        onPointerLeave={() => setDragging(false)}
      >
        {cells.flat().map(({ row, column }) => {
          const isSelected = row <= selection.rows && column <= selection.columns
          return (
            <Cell
              key={`${row}-${column}`}
              role="gridcell"
              aria-selected={isSelected}
              $selected={isSelected}
              onPointerDown={() => {
                setDragging(true)
                handleSelect(row, column)
              }}
              onPointerEnter={() => {
                if (dragging) {
                  handleSelect(row, column)
                }
              }}
            />
          )
        })}
      </Grid>
      <Count>Selected dice: {selectedCount}</Count>
    </Selector>
  )
}

export default DiceSelector
