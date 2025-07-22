import { api } from "@/lib/axios";
import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras e espaços"),
  username: z
    .string()
    .min(1, "Username é obrigatório")
    .min(3, "Username deve ter pelo menos 3 caracteres")
    .max(20, "Username deve ter no máximo 20 caracteres")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username deve conter apenas letras, números e underscore"
    )
    .toLowerCase(), // Converte para minúscula automaticamente
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número"
    ),
});

export const Login = async (dataLogin) => {
  try {
    const request = await api.post("login", dataLogin);
    return request.data;
  } catch (error) {

    return { erro: error?.response?.data?.erro || "Verifique suas credenciais e tente novamente" };
  }
};

export const Register = async (dataCreateUser) => {
  try {
    await registerSchema.parse(dataCreateUser);
    const request = await api.post("register", dataCreateUser);
    return request.data;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.issues.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});

      let messages = []
      Object.keys(formattedErrors).forEach(key => {
        messages.push(formattedErrors[key])
      })
      return { erro: messages.join(", ") };
    }
    return { erro: error?.response?.data?.erro || "Erro desconhecido" };
  }
};

export const Logout = async () => {
  const request = await api.post("logout");
  return request.data;
};
