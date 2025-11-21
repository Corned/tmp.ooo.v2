import Directory from "./directory"
import FileSystemNode from "./FileSystemNode"

class File implements FileSystemNode {
  #content: string
  #parent: Directory | null = null

  constructor(public name: string, content: string, parent: Directory | null = null) {
    this.#content = content
    this.#parent = parent
  }

  getType(): "File" {
    return "File"
  }

  read() {
    return this.#content
  }

  write(newContent: string) {
    this.#content = newContent
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
    return "/" + this.name // Root level file
  }

  toString(): string {
    return `File(${this.getPath()})`
  }
}

export default File