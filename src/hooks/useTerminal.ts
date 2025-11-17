import useCommandHistory from "@/hooks/useCommandHistory"
import parseCommand from "@/lib/terminal/parseCommand"
import { useState, useRef } from "react"

const useTerminal = () => {
  const [prompt, setPrompt] = useState<string>("guest:~ $")
  const [currentCommand, setCurrentCommand] = useState<string>("")
  const inputRef = useRef<HTMLSpanElement>(null)

  const {
    history: commandHistory,
    addCommand: addCommandToHistory,
    clearHistory: clearCommandHistory,
  } = useCommandHistory()

  const run = (str: string) => {
    const commandString = str.trim()
    addCommandToHistory(prompt, commandString)

    const [program, args] = parseCommand(commandString)
    console.log(program, args)
    if (inputRef.current) {
      setCurrentCommand("")
      inputRef.current.textContent = ""
    }
  }

  const handleInput = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    const text = e.currentTarget.textContent || ""
    setCurrentCommand(text)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (!inputRef.current) return

    // Submit
    if (e.key === "Enter") {
      e.preventDefault()
      run(currentCommand)
    }
  }

  return {
    prompt,
    setPrompt,
    commandHistory,
    addCommandToHistory,
    clearCommandHistory,
    handleInput,
    handleKeyDown,
    inputRef,
  }
}

export default useTerminal
