// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col items-center border-2 border-gray-200 rounded-4xl p-2 lg:pt-10 w-full lg:w-[45%]">
        <div className="flex flex-wrap text-3xl lg:text-5xl text-slate-800">
          <h1 className='font-opensans font-semibold'>
            Welcome to
          </h1>
          <h1 className="font-charm ">&nbsp;แชทจีพีเทียม</h1>
        </div>
        <main className="p-5 w-full flex flex-col items-center">
          <div className="border-2 border-gray-200 rounded-4xl w-full lg:w-full lg:max-w-[70%] h-full py-3 px-5">
            <input
              name="Prompt"
              placeholder='Ask anything...'
              className=" text-gray-700 border-none outline-0 w-full"
            />
            <button className="mt-2 rounded-full bg-gradient-to-br from-black to-gray-800 text-white px-3 text-2xl shadow-lg hover:scale-110 hover:from-gray-900 hover:to-slate-800 transition-all duration-200 ease-in-out cursor-pointer">
              +
            </button>
          </div>
        </main>
      </div>


    </div>
  )
}

export default App
