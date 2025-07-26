import type { Message } from '../interfaces/Message';
import MessageBubble from './MessageBubble';

type Props = {
  messages: Message[];
};

export default function ChatBox({ messages }: Props) {
  return (
    <section
      className={`relative w-full overflow-y-auto flex flex-col pb-[120px] ${
        messages.length === 0 ? 'h-full items-center justify-center' : ''
      }`}
    >
      {messages.length > 0 ? (
        messages.map((m) => <MessageBubble key={m.id} message={m} />)
      ) : (
        <div className="text-center text-gray-700">No messages yet.</div>
      )}
    </section>
  );
}
