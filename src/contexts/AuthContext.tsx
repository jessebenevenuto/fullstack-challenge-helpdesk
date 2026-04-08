import { useState, useEffect } from "react";
import { createContext } from "react";
import { api } from "../services/api";
import { AxiosError } from "axios";

type AuthContext = {
  isLoading: boolean;
  session: null | UserAPIResp;
  saveUser: (data: UserAPIResp) => void;
  removeUser: () => void;
}

const LOCAL_STORAGE_KEY = "@helpdesk";

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<UserAPIResp | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  function saveUser(data: UserAPIResp) {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:user`, JSON.stringify(data.user));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token); 

    setSession(data);
  }

  function loadUser() {
    const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`);
    const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`);
  
    if(token && user) {
      setSession({
        user: JSON.parse(user),
        token,
      });
    }

    setIsLoading(false);
  }
  
  function removeUser() {
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`);

    setSession(null);

    window.location.assign("/");
  }

  api.interceptors.response.use((response) => response, (error) => {
    if(error instanceof AxiosError) {
      alert(error.response?.data.message);
    }
    
    if(error.response?.status === 401) {
      removeUser();
    }
  });

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ session, saveUser, removeUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
