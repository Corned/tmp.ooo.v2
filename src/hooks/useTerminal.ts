import useHistory from "@/hooks/useHistory"
import parseCommand from "@/lib/terminal/parseCommand"
import { useState, useRef } from "react"

import commands from "@/lib/commands"

const useTerminal = () => {
  const [prompt, setPrompt] = useState<string>("guest:~ $")
  const [currentCommand, setCurrentCommand] = useState<string>("")
  const inputRef = useRef<HTMLSpanElement>(null)

  const history = useHistory()

  const run = (str: string) => {
    const commandString = str.trim()
    history.append(prompt, commandString)

    const [program, args] = parseCommand(commandString)

    if (program && commands[program]) {
      console.log(`Running command: ${program} with args:`, args)
      const output = commands[program](...args)
      history.append("", output)
    } else {
      console.log(`Command not found: ${program}`)
    }

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
    history: history.history, // ew
    prompt,
    setPrompt,
    handleInput,
    handleKeyDown,
    inputRef,
  }
}

export default useTerminal
