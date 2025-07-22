"use client";
import Message from "./Message";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { GetMessages } from "@/api/conversations";
import { toast } from "sonner";
import { useSocket } from "@/context/SocketContext";

const MessageList = () => {
  const userSearchParam = useSearchParams();
  const receiverId = userSearchParam.get("receiverId");
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const { socket } = useSocket();

  const getDetailsConversation = async () => {
    let allMessages = await GetMessages(id, receiverId);
    let { erro } = allMessages;
    if (erro) return toast.error(erro);
    setMessages(allMessages);
  };

  useEffect(() => {
    getDetailsConversation();
    socket?.on("new_message", (message) => {
      if (message.conversationId !== id) return;
      debugger;
      let [existeMessage] = messages.filter((m) => m.id == message.id);
      if (!existeMessage) setMessages((prev) => [...prev, message]);
    });
  }, [id, receiverId]);

  useEffect(() => {
    if (scrollRef?.current)
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const scrollRef = useRef(null);
  return (
    <div className="flex-1">
      <ScrollArea className="h-[75vh]">
        <div className="w-full max-w-3xl mx-auto px-4">
          {messages.map((message, index) => (
            <Message e key={index} {...message} />
          ))}
        </div>
        <div ref={scrollRef} />
      </ScrollArea>
    </div>
  );
};

export default MessageList;
