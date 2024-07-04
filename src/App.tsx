import { useState } from 'react'

function App() {

  return (
    <div className="bg-black w-full h-screen flex flex-col align-center justify-center">
      <div className="flex flex-col justify-center">
        <h1 className="text-white text-center select-none" style={{ fontSize: "8rem", textShadow: "rgba(255, 255, 255, 0.2) 0 0 50px" }}>TMP.OOO</h1>

        <div className="flex flex-row justify-center gap-3">
          <button className="px-6 py-2 bg-white/5 text-white rounded-full hover:bg-white hover:text-black select-none">github</button>
          <button className="px-6 py-2 bg-white/5 text-white rounded-full hover:bg-white hover:text-black select-none">lerp</button>
          <button className="px-6 py-2 bg-white/5 text-white rounded-full hover:bg-white hover:text-black select-none">navi</button>
          <button className="px-6 py-2 bg-white/5 text-white rounded-full hover:bg-white hover:text-black select-none">misc</button>
        </div>
      </div>
    </div>
  )
}

export default App
