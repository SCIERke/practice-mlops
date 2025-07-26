import type { Message } from '../interfaces/Message';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
  message: Message;
};

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`mb-2 p-3 rounded-2xl break-words ${
        isUser
          ? 'bg-gray-100 text-right self-end  max-w-[80%] md:max-w-[70%] lg:max-w-[50%]'
          : 'text-left prose lg:prose w-full max-w-none'
      }`}
    >
      {isUser ? (
        <p className="text-base">{message.content}</p>
      ) : (
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
      )}
    </div>
  );
}
