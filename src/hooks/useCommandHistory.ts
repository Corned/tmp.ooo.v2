import { Command } from "@/types/command"
import { useState } from "react"

const useCommandHistory = () => {
  const [history, setHistory] = useState<Command[]>([])

  const addCommand = (prompt: string, body: string) => {
    const newCommand: Command = {
      id: crypto.randomUUID(),
      prompt,
      body,
      timestamp: new Date(),
    }
    setHistory([...history, newCommand])
  }
  const clearHistory = () => {
    setHistory([])
  }

  return [history, addCommand, clearHistory]
}

export default useCommandHistory
