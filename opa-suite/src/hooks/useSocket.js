import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export function useSocket(userId, onMessage) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const socket = io("http://localhost:4000", {
      transports: ["websocket"],
      query: { userId },
    });

    socket.on("connect", () => {
      console.log("✅ Conectado ao WebSocket:", socket.id);
      socket.emit("register", userId);
    });

    socket.on("new_message", (data) => {
      console.log("📨 Nova mensagem recebida", data);
      if (onMessage) onMessage(data);
    });

    socket.on("disconnect", () => {
      console.log("🔌 Desconectado do WebSocket");
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return socketRef;
}
