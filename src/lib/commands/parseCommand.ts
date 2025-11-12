export default function parseCommand(command: string) {
  const [program, ...rest] = command.split(" ")
  const tokens = []

  let currentToken = ""
  let quoteType = null

  for (const c of rest.join(" ")) {
    // Check for quotes
    if (c === '"' || c === "'") {
      if (quoteType === c) {
        quoteType = null
        continue
      } else if (quoteType === null) {
        quoteType = c
        continue
      }
    }

    // If inside quotes, just accumulate characters
    if (quoteType) {
      currentToken += c
      continue
    }

    // Handle spaces outside quotes
    if (c === " ") {
      if (currentToken !== "") {
        tokens.push(currentToken)
        currentToken = ""
        continue
      }
    }

    currentToken += c
  }

  tokens.push(currentToken)
  // console.log(`Program: ${program}`)
  // console.log("Arguments/Options:", tokens)

  return [program, tokens]
}
/*
const testCommands = [
  "mkdir hello-world",
  "uv run python",
  "rm -f file",
  "node --max-old-space-size=4096",
  'grep --context=3 "pattern"',
  "ls -la",
  "tar -xzvf",
  "crazy-test --option=\"value with spaces '-another option'\"",
]

for (const cmd of testCommands) {
  console.log(`Parsing command: ${cmd}`)
  parseCommand(cmd)
  console.log("-----")
}
*/
