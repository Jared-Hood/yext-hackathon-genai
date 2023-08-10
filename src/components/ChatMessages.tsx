import { useEffect, useRef } from "react";
import { ChatMessage } from "../App"

interface ChatMessagesProps {
  messages: ChatMessage[];
  initialMessage: string;
}

export default function ChatMessages(props: ChatMessagesProps) {
  const messagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [props.messages]);

  return (
    <div className="flex flex-col overflow-y-auto" ref={messagesRef}>
      <div className='mb-2 max-w-[80%] w-[fit-content]  bg-gray-100 px-4 py-2 rounded-lg text-left'>{props.initialMessage}</div>
      {props.messages.map((m, idx) => {
        if (m.author === "user") {
          return (
            <div key={idx} className='mb-2 w-[fit-content] bg-blue-100 px-4 py-2 rounded-lg text-right self-end'>{m.content.split('.PREV_ID')[0]}</div>
          )
        }
        return <div key={idx} className='mb-2 max-w-[80%] w-[fit-content]  bg-gray-100 px-4 py-2 rounded-lg text-left'>{m.content.message}</div>
      })}
    </div>
  );
}
