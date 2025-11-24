import ITerminalCell from "@/types/ITerminalCell"
import ITerminalState from "@/types/ITerminalState"
import { useState } from "react"

const Terminal = (COLS = 128, ROWS = 64) => {
  const [state, setState] = useState<ITerminalState>({
    grid: Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => ({
        char: " ",
        color: "white",
        bgColor: "#16161d",
        bold: false,
        italic: false,
        underline: false,
      }))
    ),
    cursorRow: 0,
    cursorCol: 0,
    cursorChar: "",
  })

  const advanceCursor = (currentState: ITerminalState) => {
    let newX = currentState.cursorCol + 1
    let newY = currentState.cursorRow
    if (newX >= COLS) {
      newX = 0
      newY += 1
    }

    if (newY >= ROWS) {
      newY = 0
    }

    return {
      ...currentState,
      cursorCol: newX,
      cursorRow: newY,
    }
  }

  const write = (currentState: ITerminalState, value: string) => {
    const newGrid = [
      ...currentState.grid.map((row: ITerminalCell[]) => [...row]),
    ]

    newGrid[currentState.cursorRow][currentState.cursorCol].char = value


    return {
      ...advanceCursor(currentState),
      grid: newGrid,
    }
  }

  const writeString = (currentState: ITerminalState, text: string) => {
    let newState = { ...currentState }
    for (const char of text) {
      if (char === "\n") {
        newState.cursorCol = 0
        newState.cursorRow += 1
        if (newState.cursorRow >= ROWS) {
          newState.cursorRow = 0
        }
      } else {
        newState = write(newState, char)
      }
    }

    return newState
  }

  return [state, setState, write, writeString] as const
}

export default Terminal
