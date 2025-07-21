"use client"
import { useSocket } from "../hooks/useSocket";
import { useState } from "react";
export default function Home() {
  const [userId] = useState("user123");
  const [convoId, setConvoId] = useState("");
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  const socketRef = useSocket(userId, (data) => {
    setMessages((prev) => [...prev, data.message]);
  });

  const handleSend = () => {
   
    if (socketRef.current && convoId && msg) {
      socketRef.current.emit("send_message", {
        convoId,
        content: msg,
      });
      setMsg("");
    }
  };

  const handleStartConvo = () => {
    debugger;
    if (socketRef.current) {
      socketRef.current.emit("start_conversation", {
        participants: [userId, "user456"]
      }, (res) => {
        setConvoId(res.convoId);
      });
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>💬 Chat React com Socket.IO</h2>
      <button onClick={handleStartConvo}>Iniciar conversa com user456</button>
      <br /><br />
      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Digite uma mensagem"
      />
      <button onClick={handleSend}>Enviar</button>

      <ul>
        {messages.map((m, i) => (
          <li key={i}>{m.senderId}: {m.content}</li>
        ))}
      </ul>
    </div>
  );
}
