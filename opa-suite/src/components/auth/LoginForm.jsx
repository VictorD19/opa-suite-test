"use client";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SubmitButton } from "../SumitButton";
import { useState } from "react";
import { Login } from "@/api/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSocket } from "@/context/SocketContext";
import { useAuth } from "@/context/AutContext";
import { Separator } from "../ui/separator";

export function LoginForm({ className, ...props }) {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();
  const socketConnect = useSocket();
  const { setUser } = useAuth()
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message, erro, ...data } = await Login(loginData);
      if (erro) return toast.error(erro);

      toast.success(message);
      router.push("/");
      setUser(data.user)
      socketConnect?.socket?.connect();

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="">
        <CardHeader>
          <CardTitle className="text-2xl">Acesse su conta</CardTitle>
          <CardDescription>Insira suas credenciais para fazer login</CardDescription>
        </CardHeader>
        <CardContent className="">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  type="text"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={handleChange}
                />
              </div>
              <SubmitButton text={"Enviar"} />
            </div>
         <Separator  />
            <div className="mt-4 text-center text-sm">
              Não tem conta?{" "}
              <Link
                href="/register"
                className="underline underline-offset-4 text-violet-500"
              >
                Cadastre-se
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
