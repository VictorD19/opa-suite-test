"use client";
import { useState } from "react";
import { ArrowUp, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useSocket } from "@/context/SocketContext";
import { useParams, useSearchParams } from "next/navigation";

export const ChatInput = ({}) => {
  const [message, setMessage] = useState("");
  const { SendMessage } = useSocket();
  const searchParams = useSearchParams();
  const { id } = useParams();
  const onSend = (content) => {
    if (!content) return;
 
    SendMessage({
      receiverId: searchParams.get("receiverId"),
      content,
      type: "text",
      conversationId: id,
    });
  };

  const handleSubmit = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  return (
    <div className="w-full border p-2  rounded">
      <textarea
        rows={2}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escreva sua mensagem aqui ..."
        style={{
          maxHeight: "200px",
          scrollbarWidth: "thin",
          scrollbarColor: "#666 transparent",
        }}
        className="w-full bg-transparent p-0 m-0 resize-none  focus:outline-none custom-scrollbar px-[10px]  mx-0 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
      />
      <div className="flex justify-end  ">
        <Button
          variant="ghost"
          onClick={handleSubmit}
          disabled={!message.trim()}
          className="bg-primary     hover:bg-violet-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-full"
        >
          Enviar <ArrowUp size={64} className=" text-black " />
        </Button>
      </div>
    </div>
  );
};
