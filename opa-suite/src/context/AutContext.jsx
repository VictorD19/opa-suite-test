"use client"
import { GetUser } from "@/api/user";
import { toast } from "sonner";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const loadUser = async () => {
    const { erro, ...data } = await GetUser();
    if (erro) return toast.error(erro);
    setUser(data);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const { user } = useContext(AuthContext);
  return {
    user,
  };
}
