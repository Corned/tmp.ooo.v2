import { useEffect, useRef, useState } from 'react'

function App() {


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

      <div className="terminal rounded w-[500px] py-2 px-4">
        <div className="terminal__input">
          <p>
            <span>{"> "}</span>{spans}
          </p>
        </div>
      </div>

    </div>
  )
}

export default App
