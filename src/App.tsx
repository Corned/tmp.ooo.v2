import React, { useEffect, useState } from "react"
import useTerminal from "./lib/terminal"
import ITerminalCell from "./types/ITerminalCell"
import { logo } from "./assets/logo"

const COLS = 120
const ROWS = 32
const block = "█"

function App() {
  const [ state, setState, _write, writeString ] = useTerminal(COLS, ROWS)

  useEffect(() => {
    // Center and write each line of the logo
    for (const line of logo.split("\n")) {
      setState(prev => ({ ...prev, cursorCol: Math.floor((COLS - line.length) / 2) }))
      writeString(line + "\n")
    }

    // Write welcome message centered
    const welcomeLine = "Welcome to tmp.ooo!"
    setState(prev => ({ ...prev, cursorCol: Math.floor((COLS - welcomeLine.length) / 2) }))
    writeString(welcomeLine + "\n\n\n")

    // Write prompt
    writeString("guest:developer $ ")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="flex h-screen flex-col items-center justify-center"
      style={{ backgroundColor: "#16161d" }}
    >
      <div
        className="terminal grid border border-gray-700 p-1"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          width: "fit-content",
          gap: 1,
        }}
      >
        {state.grid.map((row: ITerminalCell[], rowIndex: number) =>
          row.map((cell: ITerminalCell, colIndex: number) => (
            <span
              key={`cell-${rowIndex}-${colIndex}`}
              className={`text-lg leading-none text-white  ${cell.bold ? "font-bold" : ""} ${cell.italic ? "italic" : ""} ${cell.underline ? "underline" : ""}`}
              style={{ color: cell.color, backgroundColor: cell.bgColor }}
            >
              {
                rowIndex === state.cursorRow && colIndex === state.cursorCol
                  ? block
                  : cell.char
              }
            </span>
          ))
        )}
      </div>
    </div>
  )
}

export default App
