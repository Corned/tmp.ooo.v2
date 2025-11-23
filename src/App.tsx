import React, { useEffect, useState } from "react"
import Terminal from "./lib/terminal"
import ITerminalCell from "./types/ITerminalCell"

const COLS = 120
const ROWS = 32

const str = "const f = (a: number) => a + 1 "
const block = "█"

const logo = `
 ███████████ ██████   ██████ ███████████        ███████       ███████       ███████
▒█▒▒▒███▒▒▒█▒▒██████ ██████ ▒▒███▒▒▒▒▒███     ███▒▒▒▒▒███   ███▒▒▒▒▒███   ███▒▒▒▒▒███
▒   ▒███  ▒  ▒███▒█████▒███  ▒███    ▒███    ███     ▒▒███ ███     ▒▒███ ███     ▒▒███
    ▒███     ▒███▒▒███ ▒███  ▒██████████    ▒███      ▒███▒███      ▒███▒███      ▒███
    ▒███     ▒███ ▒▒▒  ▒███  ▒███▒▒▒▒▒▒     ▒███      ▒███▒███      ▒███▒███      ▒███
    ▒███     ▒███      ▒███  ▒███           ▒▒███     ███ ▒▒███     ███ ▒▒███     ███
    █████    █████     █████ █████        ██ ▒▒▒███████▒   ▒▒▒███████▒   ▒▒▒███████▒
   ▒▒▒▒▒    ▒▒▒▒▒     ▒▒▒▒▒ ▒▒▒▒▒        ▒▒    ▒▒▒▒▒▒▒       ▒▒▒▒▒▒▒       ▒▒▒▒▒▒▒
`

function App() {
  const [ state, setState, write, writeString ] = Terminal(COLS, ROWS)



  useEffect(() => {
    let stateCopy = { ...state }
    stateCopy = writeString(stateCopy, logo)
    stateCopy = writeString(stateCopy, "\n")
    stateCopy = writeString(stateCopy, "Hello, World! Welcome to tmp.ooo!")
    stateCopy = writeString(stateCopy, "\n")
    stateCopy = writeString(stateCopy, str)
    stateCopy = writeString(stateCopy, "\n")
    setState(() => stateCopy)

  }, [])

  return (
    <div
      className="flex h-screen flex-col items-center justify-center"
      style={{ backgroundColor: "#16161d" }}
    >
      <div
        className="terminal grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          width: "fit-content",
          gap: 0,
        }}
      >
        {state.grid.map((row: ITerminalCell[], rowIndex: number) =>
          row.map((cell: ITerminalCell, colIndex: number) => (
            <span
              key={`cell-${rowIndex}-${colIndex}`}
              className={`text-lg leading-none text-white ${cell.bold ? "font-bold" : ""} ${cell.italic ? "italic" : ""} ${cell.underline ? "underline" : ""}`}
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
