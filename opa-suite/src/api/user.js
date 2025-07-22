import { ExecuteRequestGET } from ".";

export const GetUser = async () => {
  return await ExecuteRequestGET("me");
};

export const GetAllUsers = async () => {
  return await ExecuteRequestGET("allUsers");
};
export const GetDetailsUser = async(userId)=>{
  return await ExecuteRequestGET(`${userId}/details`)
}