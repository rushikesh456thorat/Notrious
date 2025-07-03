import { useState } from "react";
import { useAuthStore } from "../zustand/useAuthStore.js";
import { toast } from "react-toastify";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      

      if (data.status !== "success") {
        toast.error(data.message);
        return
      }
      delete data.status
      setAuthUser(data);
      toast.success("Login successful");
      
    } catch (error) {
      toast.error("Login error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;
