import useCommandHistory from "@/hooks/useCommandHistory"
import parseCommand from "@/lib/commands/parseCommand"
import { useState, useRef } from "react"

const useTerminal = () => {
  const [prompt, setPrompt] = useState<string>("[tmp.ooo] #")
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
  }

  const handleInput = (e: React.FormEvent<HTMLSpanElement>) => {
    if (!inputRef.current) return
    const text = e.currentTarget.textContent || ""
    setCurrentCommand(text)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (!inputRef.current) return

    // Submit
    if (e.key === "Enter") {
      e.preventDefault()
      if (currentCommand.trim() !== "") {
        run(currentCommand)
      }
    }

    const text = e.currentTarget.textContent || ""
    setCurrentCommand(text)
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
