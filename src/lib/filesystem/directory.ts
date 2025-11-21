import File from './file'
import FileSystemNode from './FileSystemNode'

class Directory implements FileSystemNode {
  #children: FileSystemNode[] = []
  #parent: Directory | null = null

  constructor(public name: string) {
    this.name = name
  }

  getType(): "Directory" {
    return "Directory"
  }

  add(child: FileSystemNode) {
    child.setParent(this)
    this.#children.push(child)
  }

  removeFile(fileName: string) {
    this.#children = this.#children.filter(file => file.name !== fileName)
  }

  getChild(fileName: string): FileSystemNode | undefined {
    return this.#children.find(file => file.name === fileName)
  }

  // Type-safe method to get only directories
  getDirectory(name: string): Directory | undefined {
    const child = this.#children.find(c => c.name === name)
    return child?.getType() === "Directory" ? child as Directory : undefined
  }

  // Type-safe method to get only files
  getFile(name: string): File | undefined {
    const child = this.#children.find(c => c.name === name)
    return child?.getType() === "File" ? child as File : undefined
  }

  // Path-based navigation
  navigate(path: string): Directory | undefined {
    const parts = path.split('/').filter(p => p !== "")

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let current: Directory = this
    
    for (const part of parts) {
      const next = current.getDirectory(part)
      if (!next) return undefined
      current = next
    }
    return current
  }

  listChildren(): string[] {
    return this.#children.map(file => file.name)
  }

  setParent(directory: Directory) {
    this.#parent = directory
  }

  getParent(): Directory | null {
    return this.#parent
  }

  getPath(): string {
    if (this.#parent) {
      return `${this.#parent.getPath()}/${this.name}`
    }
    return "/" + this.name // Root level directory
  }

  toString(): string {
    return this.#toStringRecursive(0)
  }

  #toStringRecursive(n: number): string {
    let stringRep = "\t".repeat(n) + `Directory(${this.getPath()}) Children: ${this.#children.length}\n`
    for (const child of this.#children) {
      if (child.getType() === "Directory") {
        stringRep += (child as Directory).#toStringRecursive(n + 1)
      } else {
        stringRep += "\t".repeat(n + 1) + child.toString() + "\n"
      }
    }
    return stringRep
  }

  // Simple toString for quick representation
  simpleString() {
    return `Directory(${this.name})`
  }

}

export default Directory