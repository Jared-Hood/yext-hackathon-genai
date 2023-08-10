import { ChatMessage } from "../App"

interface ChatMessagesProps {
  messages: ChatMessage[];
}

export default function ChatMessages(props: ChatMessagesProps) {
  if (!props.messages.length) {
    return null;
  }

  return (
    <div>
      {props.messages.map((m, idx) => {
        if (m.author === "user") {
          return (
            <div key={idx} className='bg-blue-100'>{m.content}</div>
          )
        }
        return <div key={idx} className='bg-green-100'>{m.content.message}</div>
      })}
    </div>
  );
}
