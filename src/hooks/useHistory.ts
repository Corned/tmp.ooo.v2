import { ICommand } from "@/types/command"
import { useState } from "react"

const useHistory = () => {
  const [history, setHistory] = useState<ICommand[]>([])

  const append = (prompt: string, body: string) => {
    const newCommand: ICommand = {
      id: crypto.randomUUID(),
      prompt,
      body,
      timestamp: new Date(),
    }
    setHistory([...history, newCommand])
  }
  const clear = () => {
    setHistory([])
  }

  return {
    history,
    append,
    clear,
  }
}

export default useHistory
