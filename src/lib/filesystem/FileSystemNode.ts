import Directory from "./directory"

interface FileSystemNode {
  name: string
  getType(): "File" | "Directory"
  getParent(): Directory | null
  setParent(directory: Directory): void
  getPath(): string
  toString(): string
}

export default FileSystemNode
