import { useEffect, useRef, useState } from "react"
import useTerminal from "@/hooks/useTerminal"
import { ICommand } from "@/types/command"

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
  const { prompt, commandHistory, handleInput, handleKeyDown, inputRef } =
    useTerminal()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef])

  return (
    <div className="flex h-screen flex-col justify-center bg-black">
      <Header />

      <div className="terminal mx-auto mb-20 flex h-[400px] w-[600px] flex-col items-center justify-items-center rounded p-1">
        <div className="overflow-y mt-auto flex w-full flex-col">
          {commandHistory.map((command: ICommand, index) => (
            <div key={index} className="flex-grow-0 font-mono text-white">
              <p className="break-all text-xs">
                {command.prompt} {command.body}
              </p>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-row">
          <p className="max-w-full select-none whitespace-pre text-wrap break-all text-xs font-semibold">
            <span>{`${prompt} `}</span>
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
