import ITerminalCell from "./ITerminalCell"

interface TerminalState {
  grid: ITerminalCell[][]
  cursorRow: number
  cursorCol: number
  cursorChar: string
}

export default TerminalState