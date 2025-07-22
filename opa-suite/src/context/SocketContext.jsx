"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AutContext";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const newSocket = io(process.env.NEXT_PUBLIC_API_URL_BASE, {
      transports: ["websocket"],
      query: { id: user?.id },
    });

    newSocket.on("connect", () => {
      newSocket.emit("user_connected", user);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  const SendMessage = async ({ receiverId, content, type, conversationId }) => {
    socket.emit("new_message", { receiverId, content, type, conversationId });
  };

  return (
    <SocketContext.Provider value={{ socket, SendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socketContext = useContext(SocketContext);
  return {
    socket: socketContext?.socket,
    SendMessage: socketContext?.SendMessage,
  };
};
