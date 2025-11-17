import { ICommand } from "@/types/command"
import { useState } from "react"

const useCommandHistory = () => {
  const [history, setHistory] = useState<ICommand[]>([])

  const addCommand = (prompt: string, body: string) => {
    const newCommand: ICommand = {
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

  return {
    history,
    addCommand,
    clearHistory,
  }
}

export default useCommandHistory
