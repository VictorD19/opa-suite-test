const { api } = require("@/lib/axios");
const { Logout } = require("./auth");

const TYPE_REQUEST = {
  POST: 1,
  GET: 2,
  PUT: 3,
  PACTH: 4,
  DELETE: 5,
};
const ExecuteRequest = async (typeRequest, url, data) => {
  try {
    let request;
    switch (typeRequest) {
      case TYPE_REQUEST.POST:
        request = await api.post(url, data);
        break;
      case TYPE_REQUEST.GET:
        request = await api.get(url);
        break;
      case TYPE_REQUEST.PACTH:
        request = await api.patch(url, data);
        break;
      case TYPE_REQUEST.PUT:
        request = await api.put(url, data);
        break;
      case TYPE_REQUEST.DELETE:
        request = await api.delete(url);
        break;
    }

    return request.data;
  } catch (error) {
    if (error.response?.status === 401) {
      await Logout();
      document.cookie = "connect.sid=; Max-Age=0; path=/;";
      document.location.href = "/login";
      return;
    }
    return {
      erro:
        error?.response?.data?.erro ||
        "Ocorreu um erro ao tentar obter as informações do usuario",
    };
  }
};

const ExecuteRequestGET = async (url) => await ExecuteRequest(TYPE_REQUEST.GET,url);
const ExecuteRequestPOST = async (url,data) => await ExecuteRequest(TYPE_REQUEST.POST,url,data);

export {
    ExecuteRequestGET,ExecuteRequestPOST
}
