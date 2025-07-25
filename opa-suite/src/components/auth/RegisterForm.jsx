"use client";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SubmitButton } from "../SumitButton";
import { Register } from "@/api/auth";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSocket } from "@/context/SocketContext";
import { useAuth } from "@/context/AutContext";
import { Separator } from "../ui/separator";

export function RegisterForm({ className, ...props }) {
  const [registerData, setRegisterData] = useState({
    username: "",
    name: "",
    password: "",
  });
  const router = useRouter();
  const socketConnect = useSocket();
  const { setUser } = useAuth();
  useEffect(() => { }, [socketConnect?.socket]);

  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const { message, erro, ...data } = await Register(registerData);
      if (erro) return toast.error(erro);

      toast.success(message);
      setUser(prev => data.user)
      router.push("/");

      socketConnect?.socket?.connect();
    } catch (error) {
      toast.error(error.message);
    }
  };


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card >
        <CardHeader>
          <CardTitle className="text-2xl">Novo Usuario</CardTitle>
        </CardHeader>
        <CardContent >
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Nome</Label>
                <Input id="name" type="text" required onChange={handleChange} />
              </div>
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
            <Separator />
            <div className="mt-4 text-center text-sm">
              Já tem conta?{" "}
              <Link
                href="/login"
                className="underline underline-offset-4 text-violet-500"
              >
                Entrar
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
