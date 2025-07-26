import { useState, useRef } from 'react'


import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


const tempData = `
# 📝 บันทึกประจำวัน

วันนี้เป็นวันที่ **ดีมาก** เพราะฉันเรียนรู้เรื่อง \`Markdown\`
ลองดูสิ! มันง่ายและสะดวกมาก 🎉

## สิ่งที่ทำวันนี้

- [x] ตื่นนอนตอนเช้า
- [x] ดื่มกาแฟ ☕
- [ ] เขียนโปรแกรม
- [ ] ออกกำลังกาย

## ลิงก์ที่น่าสนใจ

- [ไปยังเว็บไซต์ Google](https://www.google.com)
- [ดูโค้ดบน GitHub](https://github.com)
`;


import './App.css'

interface Message {
   id: string,
   role: string,
   content: string
}

function App() {
  const [inputText , setInputText] = useState<string>("");
  const messages:Message[] = [
    {
      id: '1',
      role: 'user',
      content: 'dasdasdasdasdasdasdasdasdasdasdadasdasdasdasdasdasdwdasdasdasdasdasdasdasdasdasdasdadasdasdasdasdasdasdw',
    },
    {
      id: '2',
      role: 'system',
      content: tempData
    },
    {
      id: '3',
      role: 'user',
      content: 'ถ้าคุณอยากให้ข้อความเลื่อนอัตโนมัติไปล่างสุดเมื่อพิมพ์หรือมีข้อความใหม่ (เหมือนแชทจริงๆ) ก็บอกได้นะ กูจะใส่ให้เลย',
    },

  ];

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const maxHeight = 5 * 24;
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height =
        Math.min(scrollHeight, maxHeight) + "px";
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center overflow-hidden">
      <div className="flex flex-col items-center border-4 border-gray-300 rounded-4xl p-2 lg:pt-10 w-full lg:w-[45%] h-full">
        <div className="flex flex-wrap text-3xl lg:text-5xl text-slate-800">
          <h1 className='font-opensans font-semibold'>
            Welcome to
          </h1>
          <h1 className="font-charm ">&nbsp;แชทจีพีเทียม</h1>
        </div>
        <main className="relative p-5 w-full h-full flex flex-col items-center">
          <section
            className={`relative w-full overflow-y-auto flex flex-col pb-[120px] ${
              messages.length > 0 ? "" : "h-full items-center justify-center"
            }`}
          >
            {messages.length > 0 ? (
              messages.map((message: Message) => (
                <div
                  key={message.id}
                  className={`mb-2 p-3 rounded-2xl break-words ${
                    message.role === "user"
                      ? "bg-gray-100 text-right self-end lg:min-w-1/3 max-w-[80%] md:max-w-[70%] lg:max-w-[50%]"
                      : "text-left prose lg:prose w-full max-w-none"
                  }`}
                >
                  {message.role === "system" ? (
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ ...props }) => (
                          <p className="text-base whitespace-pre-line" {...props} />
                        ),
                        code: ({ ...props }) => (
                          <code className="bg-gray-200 px-1 rounded" {...props} />
                        ),
                      }}
                    >
                      {message.content}
                    </Markdown>
                  ) : (
                    <p className="text-base">{message.content}</p>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-700">No messages yet.</div>
            )}
          </section>

          {/* PROMPT AREA */}
          <div className="absolute bottom-10 border-2 border-gray-200 rounded-4xl w-full lg:max-w-[70%] h-auto py-3 px-5 bg-white shadow-xl">
            <textarea
              ref={textareaRef}
              name="Prompt"
              placeholder="Ask anything..."
              value={inputText}
              onChange={handleInputChange}
              rows={1}
              className="text-gray-700 border-none outline-0 w-full resize-none overflow-y-auto bg-transparent max-h-[120px]"
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
