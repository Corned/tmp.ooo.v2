import { useEffect, useRef, useState } from 'react'

function App() {


  const [ commandHistory, setCommandHistory ] = useState<string[]>([])
  const [ currentCommand, setCurrentCommand ] = useState<string>("")
  const [ historyIndex, setHistoryIndex ] = useState<number>(-1)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentCommand(event.target.value)
    // Reset height to auto to calculate new scrollHeight
    // and Set height to scrollHeight to fit content
    event.target.style.height = 'auto'
    event.target.style.height = `${event.target.scrollHeight}px`
  }

  const headerString = "hello world_"
  const spans = headerString.split("").map((char, index) => (
    <span className="breathing-weight" style={{ animationDelay: `${index*(1000/headerString.length)}ms` }} >{ char }</span>
  ))

  return (
    <div className="bg-black w-full h-screen flex flex-col items-center justify-center">

      <div className="flex flex-col justify-center">
        <h1
          className="text-white text-center select-none breathing-text"
          style={{ fontSize: "8rem", textShadow: "rgba(255, 255, 255, 0.2) 0 0 50px" }}
        >
          TMP.OOO
        </h1>
      </div>

      <div className="terminal rounded w-[500px] py-2 px-4 flex flex-row gap-2 ">
        <span className="select-none">{"> "}</span>
        <textarea
          ref={inputRef}
          value={currentCommand}
          onChange={handleOnChange}
          className="bg-black text-white resize-none flex-1 outline-none border-none overflow-hidden"
          rows={1}
          style={{ minHeight: '1.5rem' }}
        />
      </div>

    </div>
  )
}

export default App
