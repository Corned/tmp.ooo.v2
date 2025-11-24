import React, { useEffect, useState } from "react"
import Terminal from "./lib/terminal"
import ITerminalCell from "./types/ITerminalCell"

const COLS = 120
const ROWS = 32
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
    for (const line of logo.split("\n")) {
      stateCopy.cursorCol = Math.floor((COLS - line.length) / 2)
      stateCopy = writeString(stateCopy, line)
      stateCopy = writeString(stateCopy, "\n")
    }
    stateCopy = writeString(stateCopy, "\n")
    const line = "Welcome to tmp.ooo!\n\n\n"
    stateCopy.cursorCol = Math.floor((COLS - line.length) / 2)
    stateCopy = writeString(stateCopy, line)
    stateCopy = writeString(stateCopy, "\n\ntmp.ooo $ ")
    setState(() => stateCopy)

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
