import { useRef, useState } from 'react';
import type { Message, MessagePayload} from './interfaces/Message';
import ChatHeader from './components/ChatHeader';
import ChatBox from './components/ChatBox';
import MessageInput from './components/MessageInput';
import { v4 as uuidv4 } from 'uuid';
import { sendMessage } from './services/messageAPI';

function App() {
  const [inputText, setInputText] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null!);
  const [messages, setMessages] = useState<Message[]>([]);
  const dotStateRef = useRef(".");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (inputText: string) => {
    try {
      if (isSending || !inputText.trim()) return;

      setIsSending(true);

      const payload: MessagePayload = {
        id: uuidv4(),
        role: 'user',
        content: inputText,
        userId: 'temp userId',
      };

      const { userId, ...messageWithoutUserId } = payload;
      void userId;

      setMessages(prev => [...prev, messageWithoutUserId]);
      setInputText("");

      const loadingMessageId = uuidv4();
      setMessages(prev => [
        ...prev,
        {
          id: loadingMessageId,
          role: 'system',
          content: "Loading.",
        }
      ]);

      dotStateRef.current = ".";
      intervalRef.current = setInterval(() => {
        dotStateRef.current = dotStateRef.current.length >= 3 ? "." : dotStateRef.current + ".";
        setMessages(prev =>
          prev.map(m =>
            m.id === loadingMessageId ? { ...m, content: "Loading" + dotStateRef.current } : m
          )
        );
      }, 500);

      const response = await sendMessage(payload);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsSending(false)
      }

      setMessages(prev => prev.filter(m => m.id !== loadingMessageId));

      if (response?.status === 201) {
        setMessages(prev => [...prev, response.data]);
        console.log('Create Success Re-Loading Data');
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: uuidv4(), // error same id
            role: 'system',
            content: 'Error try to send message again!',
          }
        ]);
      }
    } catch (e) {
      console.error("Error Submit Data:", e);
    }
  };

  // useEffect(() => {

  // })


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
          <MessageInput value={inputText} onChange={handleInputChange} textareaRef={textareaRef} onClick={handleSubmit} />
        </main>
      </div>
    </div>
  );
}

export default App;
