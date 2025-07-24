import axios from "axios";

const url =  process.env.NEXT_PUBLIC_API_URL_BASE || "http://localhost:4000/";
console.log("URL_BACKEND1:", url);
const IniciarCliente = () => {
  const api = axios.create({
    baseURL: url+"api/",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return api;
};
const api = IniciarCliente();



export { api };
