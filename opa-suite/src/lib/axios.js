import axios from "axios";

const IniciarCliente = () => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_BASE +"api/",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return api;
};
const api = IniciarCliente();



export { api };
