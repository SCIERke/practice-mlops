import { useState, useRef } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [userInput , setUserInput] = useState<string>("");

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setUserInput(e.target.value);
  // };
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset height before measuring
      const maxHeight = 5 * 24; // 5 rows × line-height (24px assumed)
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height =
        Math.min(scrollHeight, maxHeight) + "px";
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col items-center border-4 border-gray-300 rounded-4xl p-2 lg:pt-10 w-full lg:w-[45%] h-full">
        <div className="flex flex-wrap text-3xl lg:text-5xl text-slate-800">
          <h1 className='font-opensans font-semibold'>
            Welcome to
          </h1>
          <h1 className="font-charm ">&nbsp;แชทจีพีเทียม</h1>
        </div>
        <main className="relative p-5 w-full h-full  flex flex-col items-center">
          <div className="absolute bottom-5 border-2 border-gray-200 rounded-4xl w-full lg:w-full lg:max-w-[70%] h-auto py-3 px-5">
            <textarea
              ref={textareaRef}
              name="Prompt"
              placeholder="Ask anything..."
              value={userInput}
              onChange={handleInputChange}
              rows={1}
              className="text-gray-700 border-none outline-0 w-full resize-none overflow-y-auto bg-transparent"
              // className="text-gray-700 border-none outline-0 w-full resize-none bg-transparent leading-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
              style={{ maxHeight: "120px" }} // 5 lines × 24px line-height = 120px
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
