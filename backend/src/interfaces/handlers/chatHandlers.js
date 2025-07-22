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
  }
) => {
  socket.on("user_connected", async (data) => {
    if ( socket.userId) {
      await updateUserOnlineState.update( socket.userId, true);
    }
  });

  socket.on("start_conversation", async ({ participants }, cb) => {});

  socket.on("join_conversation", async (data, cb) => {
    debugger;
  });

  socket.on("new_message", async (data) => {
    const { receiverId, content, type, conversationId } = data;

    let message = await sendMessage.send({
      senderId: socket.userId,
      receiverId,
      content,
      type,
      conversationId,
    });


    io.to(message.senderId.toString()).emit("new_message", message);
    io.to(message.receiverId.toString()).emit("new_message", message);
  });

  socket.on("disconnect", async () => {
    if (socket.userId) {
      await updateUserOnlineState.update(socket.userId, false);
      await updateUserLastSeen.update(socket.userId);
    }
  });
};

export { chatHandler };
