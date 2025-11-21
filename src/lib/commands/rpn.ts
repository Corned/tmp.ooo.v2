export default function (...args: string[]): string {
  const expression: string = args.join("")
  const tokens: string[] = []

  // 2 + 4 in RPN is "2 4 +"
  // 2 + 4 * 3 in RPN is "2 4 3 * +"
  // 2 + (44-2) in RPN is "2 44 2 - +"

  let currentToken = ""
  
  for (const c of expression) {

  }



  return tokens.join("")
}
