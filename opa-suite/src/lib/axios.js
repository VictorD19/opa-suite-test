import axios from 'axios';

const IniciarCliente = () => {
    debugger;
    const api = axios.create({
        baseURL: process.env.URL_BACKEND || 'http://localhost:4000/api/',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return api;
};
const api = IniciarCliente();

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            if (!document) return;
            document.location.href = "/login";
            return Promise.reject("Unauthorized");
        }
        return Promise.reject(error);
    }
);



const AtualizarToken = (novoToken) => {
    api.defaults.headers["authorization"] = `Bearer ${novoToken}`;
};


export { api, AtualizarToken }