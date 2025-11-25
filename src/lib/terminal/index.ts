import ITerminalCell from "@/types/ITerminalCell"
import ITerminalState from "@/types/ITerminalState"
import { useState } from "react"

const createDefaultCell = (): ITerminalCell => ({
  char: " ",
  color: "white",
  bgColor: "#16161d",
  bold: false,
  italic: false,
  underline: false,
})

const Terminal = (COLS = 128, ROWS = 64) => {
  const [state, setState] = useState<ITerminalState>({
    grid: Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => createDefaultCell())
    ),
    cursorRow: 0,
    cursorCol: 0,
    cursorChar: "",
  })

  const advanceCursor = (cursorCol: number, cursorRow: number) => {
    let newCol = cursorCol + 1
    let newRow = cursorRow

    if (newCol >= COLS) {
      newCol = 0
      newRow += 1
    }

    if (newRow >= ROWS) {
      newRow = 0
    }

    return { cursorCol: newCol, cursorRow: newRow }
  }

  const writeChar = (
    grid: ITerminalCell[][],
    cursorCol: number,
    cursorRow: number,
    char: string
  ) => {
    const newGrid = grid.map((row, rIdx) =>
      row.map((cell, cIdx) =>
        rIdx === cursorRow && cIdx === cursorCol
          ? { ...cell, char }
          : cell
      )
    )
    return { grid: newGrid, ...advanceCursor(cursorCol, cursorRow) }
  }

  const write = (char: string) => {
    setState((prev) => {
      const { grid, cursorCol, cursorRow } = writeChar(
        prev.grid,
        prev.cursorCol,
        prev.cursorRow,
        char
      )
      return { ...prev, grid, cursorCol, cursorRow }
    })
  }

  const writeString = (text: string) => {
    setState((prev) => {
      let { grid, cursorCol, cursorRow } = prev

      for (const char of text) {
        if (char === "\n") {
          cursorCol = 0
          cursorRow += 1
          if (cursorRow >= ROWS) {
            cursorRow = 0
          }
        } else {
          const result = writeChar(grid, cursorCol, cursorRow, char)
          grid = result.grid
          cursorCol = result.cursorCol
          cursorRow = result.cursorRow
        }
      }

      return { ...prev, grid, cursorCol, cursorRow }
    })
  }

  return [state, setState, write, writeString] as const
}

export default Terminal
