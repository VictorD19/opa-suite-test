"use client"
import { GetUser } from "@/api/user";
import { toast } from "sonner";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const loadUser = async () => {
    const data = await GetUser();
    if (data?.erro) return toast.error(data?.erro);
    setUser(data);
  };

  useEffect(() => {
    
    loadUser();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const { user,setUser } = useContext(AuthContext);
  return {
    user,setUser
  };
}
