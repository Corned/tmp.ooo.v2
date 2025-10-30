import { useEffect, useRef, useState } from 'react'

function App() {


  const [ commandHistory, setCommandHistory ] = useState<string[]>([])
  const [ currentCommand, setCurrentCommand ] = useState<string>("")
  const [ historyIndex, setHistoryIndex ] = useState<number>(-1)
  const [ isBannerCentered, setIsBannerCentered ] = useState<boolean>(true)
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

  const handleOnSubmit = () => {
    if (currentCommand.trim() === "") return

    setCommandHistory([ ...commandHistory, currentCommand])
    setCurrentCommand("")
    setHistoryIndex(-1)
    
    // Move banner to top-left on first submit
    if (isBannerCentered) {
      setIsBannerCentered(false)
    }
    
    // Reset textarea height after clearing
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleOnSubmit()
    }
  }

  const headerString = "hello world_"
  const spans = currentCommand.split("").map((char, index) => (
    <span className="breathing-weight" style={{ animationDelay: `${index*(100/headerString.length)}ms` }} >{ char }</span>
  ))

  return (
    <div className="bg-black w-full h-screen relative">

      <div 
        className={`
          absolute transition-all duration-1000 ease-in-out
          ${isBannerCentered 
            ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-[100%]' 
            : 'top-8 left-8 translate-x-0 translate-y-0'
          }
        `}
      >
        <h1
          className={`
            text-white select-none breathing-text transition-all duration-500 ease-in-out
            ${isBannerCentered 
              ? 'text-center text-[8rem]' 
              : 'text-left text-6xl'
            }
          `}
          style={{ textShadow: "rgba(255, 255, 255, 0.1) 0 0 50px" }}
        >
          TMP.OOO
        </h1>
      </div>

      <div className="grid grid-rows-[1fr,auto,1fr] gap-2 h-full justify-items-center">
        <div 
          className="terminal__output w-[600px] h-full overflow-hidden"
          style={{
            perspective: '400px',
            transformStyle: 'preserve-3d'
          }}
        >
          <div
            className="flex flex-col justify-end h-full"
            style={{
              transform: 'rotateX(25deg)',
              transformOrigin: 'bottom center'
            }}
          >
            {commandHistory.map((command, index) => (
              <div key={index} className="text-white font-mono flex-grow-0">
                <p className="break-words text-xs text-yellow-400 font-semibold">{command}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="terminal rounded w-[600px] py-2 px-3 flex flex-row gap-2 ">
          <span className="select-none text-xs">{"> "}</span>
          <textarea
            ref={inputRef}
            value={currentCommand}
            onChange={handleOnChange}
            onKeyDown={handleKeyDown}
            className="bg-black text-white resize-none flex-1 outline-none border-none overflow-hidden text-xs"
            rows={1}
            style={{ minHeight: '1rem' }}
          />
        </div>
        
      </div>


    </div>
  )
}

export default App
