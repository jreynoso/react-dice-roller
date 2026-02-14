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
  border: 2px solid ${({ $selected }) => ($selected ? 'var(--accent)' : 'var(--border)')};
  background: ${({ $selected }) => ($selected ? 'var(--panel-inactive)' : 'var(--panel-secondary)')};
  box-shadow: ${({ $selected }) => ($selected ? '0 0 12px var(--panel-box-shadow)' : 'none')};
  cursor: pointer;
`

const SelectionCallout = styled.div`
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 1rem;
  background: var(--panel-secondary);
  padding: 0.85rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
`

const SelectionLabel = styled.p`
  margin: 0;
  font-size: 1rem;
  color: var(--muted);
`

const SelectionBox = styled.div`
  width: 3rem;
  height: 3rem;
  border: 2px solid var(--border);
  border-radius: 0.75rem;
  display: grid;
  place-items: center;
  font-size: 1.2rem;
  font-weight: 700;
  background: var(--panel);
  color: var(--ink);
  flex: 0 0 auto;
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

      <SelectionCallout aria-live="polite">
        <SelectionLabel>Selected dice</SelectionLabel>
        <SelectionBox aria-label={`Selected dice ${selectionCount}`}>{selectionCount}</SelectionBox>
      </SelectionCallout>
    </Selector>
  )
}

export default DiceSelector
