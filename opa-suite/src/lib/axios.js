import axios from "axios";

const IniciarCliente = () => {
  const api = axios.create({
    baseURL: process.env.URL_BACKEND || "http://localhost:4001/api/",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return api;
};
const api = IniciarCliente();



export { api };
