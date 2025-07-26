import { useRef, useState } from 'react';
import type { Message } from './interfaces/Message';
import ChatHeader from './components/ChatHeader';
import ChatBox from './components/ChatBox';
import MessageInput from './components/MessageInput';



const tempData = `# ตัวอย่าง Markdown\n- [x] Task\n\`\`\`js\nconsole.log("Hi");\n\`\`\``;

function App() {
  const [inputText, setInputText] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null!);

  const messages: Message[] = [
    { id: '1', role: 'user', content: 'สวัสดีครับ' },
    { id: '2', role: 'system', content: tempData },
    { id: '3', role: 'user', content: 'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {


    setInputText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const maxHeight = 5 * 24;
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px`;
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center overflow-hidden">
      <div className="flex flex-col items-center border-4 border-gray-300 rounded-4xl p-2 lg:pt-10 w-full lg:w-[45%] h-full">
        <ChatHeader />
        <main className="relative p-5 w-full h-full flex flex-col items-center">
          <ChatBox messages={messages} />
          <MessageInput value={inputText} onChange={handleInputChange} textareaRef={textareaRef} />
        </main>
      </div>
    </div>
  );
}

export default App;
