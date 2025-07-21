import { z } from "zod"

export const userSchema = z.object({
    name: z.string().nonempty("Precisa informar o nome"),
    username: z.string().nonempty("Precisa informar um nome de usuário"),
    password: z.string().min(8, "Precisa informar uma senha valida"),
})
