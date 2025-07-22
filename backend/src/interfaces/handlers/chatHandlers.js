const chatHandler = (
  socket,
  io,
  {
    createConversation,
    markMessageAsRead,
    updateStateConversation,
    sendMessage,
    updateUserLastSeen,
    updateUserOnlineState,
    getAllMessages,
    findUser
  }
) => {
  socket.on("user_connected", async (data) => {
    if (socket.userId) {
      socket.join(socket.userId);
      await updateUserOnlineState.update(socket.userId, true);
      io.emit("user-status-changed", { userId: socket.userId, online: true });
    }
  });

  socket.on("new_message", async (data) => {
    const { receiverId, content, type, conversationId } = data;
    socket.join(socket.userId);
    let message = await sendMessage.send({
      senderId: socket.userId,
      receiverId,
      content,
      type,
      conversationId,
    });

    let sender = await findUser.find(socket.userId)
    let receiver = await findUser.find(receiverId)
    io.to(message.senderId.toString()).emit("new_message", { message, otherUser: receiver });
    io.to(message.receiverId.toString()).emit("new_message", { message, otherUser: sender });


  });

  socket.on("disconnect", async () => {
    if (socket.userId) {
      await updateUserOnlineState.update(socket.userId, false);
      await updateUserLastSeen.update(socket.userId);
      io.emit("user-status-changed", {
        userId: socket.userId,
        online: false,
        lastSeen: new Date().toISOString(),
      });
    }
  });
};

export { chatHandler };
