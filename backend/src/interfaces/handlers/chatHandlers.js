const chatHandler = (socket, io, useCases) => {

    socket.on('start_conversation', async ({ participants }, cb) => {
      
    });

    socket.on('send_message', async ({ convoId, content }) => {
       
    });

    socket.on('disconnect', () => {
    
    });
};

export {
    chatHandler
}