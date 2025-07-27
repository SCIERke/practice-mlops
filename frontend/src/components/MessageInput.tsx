// import { useRef } from 'react';
import { AssistantNavigation } from '@mui/icons-material';


type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  onClick: (inputText: string) => Promise<void>;
};

export default function MessageInput({ value, onChange, textareaRef , onClick }: Props) {
  return (
    <div className="absolute bottom-10 border-2 border-gray-200 rounded-4xl w-full lg:max-w-[70%] h-auto py-3 px-5 bg-white shadow-xl">
      <textarea
        ref={textareaRef}
        name="Prompt"
        placeholder="Ask anything..."
        value={value}
        onChange={onChange}
        rows={1}
        className="text-gray-700 border-none outline-0 w-full resize-none overflow-y-auto bg-transparent max-h-[120px]"
      />
      <div className="flex items-center px-4 py-1">
        <button className="rounded-full bg-gradient-to-br from-black to-gray-800 text-white px-3 text-2xl shadow-lg hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer">
          +
        </button>
        <button
          title="forward message"
          type="button"
          className="from-black to-gray-800 ml-auto scale-[1.5] hover:scale-[1.7] transition-transform duration-200 ease-in-out cursor-pointer"
          onClick={() => onClick(value)}
        >
          <AssistantNavigation  />
        </button>
      </div>

    </div>
  );
}
