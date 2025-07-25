import { useAuth } from "@/context/AutContext";
import { useSocket } from "@/context/SocketContext";
import { useEffect } from "react";
import { toast } from "sonner"; // ou outro lib de notificação

export const NotificationsListener = () => {
  const { socket } = useSocket();
  const { user } = useAuth();
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = ({ message }) => {
      if (message.senderId !== user?.id) {
        toast.info(`Nova mensagem: ${message.content}`);
      }
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [socket, user?.id]);

  return null;
};
