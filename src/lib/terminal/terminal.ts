import useCommandHistory from "@/hooks/useCommandHistory"
import parseCommand from "@/lib/commands/parseCommand"
import { useState } from "react"

const useTerminal = () => {
  const [prompt, setPrompt] = useState<string>("~ > ")
  const [commandHistory, addCommandToHistory, clearCommandHistory] =
    useCommandHistory()

  const run = (str: string) => {
    const commandString = str.trim()
    addCommandToHistory(prompt, commandString)

    const [program, args] = parseCommand(commandString)
    console.log(program, args)
  }

  return [
    setPrompt,
    commandHistory,
    addCommandToHistory,
    clearCommandHistory,
    run,
  ]
}

export default useTerminal
