import { useEffect, useRef, useState } from 'react'

const Header = () => {
  return (
    <div className={`absolute top-0 left-0 w-full px-6 py-4`}>
      <h1
        className={`text-white select-none breathing-text transition-all duration-500 ease-in-out text-left text-6xl`}
        style={{ textShadow: "rgba(255, 255, 255, 0.1) 0 0 50px" }}
      >
        TMP.OOO
      </h1>
    </div>
  )
}



function App() {


  const [ commandHistory, setCommandHistory ] = useState<string[]>([ "hello", "world"])
  const [ currentCommand, setCurrentCommand ] = useState<string>("")
  const [ historyIndex, setHistoryIndex ] = useState<number>(-1)
  const inputRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleInput = (e: React.FormEvent<HTMLSpanElement>) => {
    const text = e.currentTarget.textContent || ""
    setCurrentCommand(text)
    console.log(text)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (currentCommand.trim() !== "") {
        setCommandHistory([...commandHistory, currentCommand])
        setCurrentCommand("")
        if (inputRef.current) {
          inputRef.current.textContent = ""
        }
        setHistoryIndex(-1)
      }
    }
  }

  return (
    <div className="bg-black h-screen flex flex-col justify-center">

      <Header />

      <div className="terminal px-2 py-1 rounded w-[600px] h-[400px] flex flex-col items-center justify-items-center mx-auto mb-20">
        <div className="flex flex-col w-full mt-auto">
          {commandHistory.map((command, index) => (
            <div key={index} className="text-white font-mono flex-grow-0">
              <p className="break-words text-xs font-semibold">{command}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-row w-full">
          <p className="select-none text-xs whitespace-pre max-w-full text-wrap break-all">
            <span className="text-yellow-400">~</span>
            <span className="">{" > "}</span>
            <span
              contentEditable
              ref={inputRef}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              className="border-none w-full outline-none">
            </span>
          </p>
        </div>
      </div>

    </div>
  )
}

export default App
