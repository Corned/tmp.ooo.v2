import { useEffect, useRef, useState } from "react"
import useTerminal from "./hooks/useTerminal"
import { Command } from "./types/command"

const Header = () => {
  return (
    <div className={`absolute left-0 top-0 w-full px-6 py-4`}>
      <h1
        className={`breathing-text select-none text-left text-6xl text-white transition-all duration-500 ease-in-out`}
        style={{ textShadow: "rgba(255, 255, 255, 0.1) 0 0 50px" }}
      >
        TMP.OOO
      </h1>
    </div>
  )
}

function App() {
  const { commandHistory, handleInput, handleKeyDown, inputRef } = useTerminal()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef])

  return (
    <div className="flex h-screen flex-col justify-center bg-black">
      <Header />

      <div className="terminal mx-auto mb-20 flex h-[400px] w-[600px] flex-col items-center justify-items-center rounded px-2 py-1">
        <div className="mt-auto flex w-full flex-col">
          {commandHistory.map((command: Command, index) => (
            <div key={index} className="flex-grow-0 font-mono text-white">
              <p className="break-all text-xs font-semibold">
                {command.prompt} {command.body}
              </p>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-row">
          <p className="max-w-full select-none whitespace-pre text-wrap break-all text-xs">
            <span className="text-yellow-400">~</span>
            <span className="">{" > "}</span>
            <span
              contentEditable
              ref={inputRef}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              className="w-full border-none outline-none"
            ></span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
