import { ChatInput } from "@/components/chat/ChatInput";
import { HeaderChat } from "@/components/chat/HeaderChat";
import MessageList from "@/components/chat/MessageList";

export default function Page() {
  return (
    <>
      <HeaderChat />
      <MessageList />
      <div className="w-full max-w-3xl mx-auto px-4 py-2">
        <ChatInput />
      </div>
    </>
  );
}
