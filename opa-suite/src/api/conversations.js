import { ExecuteRequestGET } from ".";

export const GetAllConversation = async () => {
  return await ExecuteRequestGET("allConversations");
};
export const  GetMessages = async(convesationId,receiverId)=>{
  return await ExecuteRequestGET(`${convesationId}/messages?receiverId=${receiverId}`)
}