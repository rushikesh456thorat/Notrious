

import { useState } from "react";
import { useAuthStore } from "../zustand/useAuthStore.js";
import { toast } from "react-toastify";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  const signup = async ({ email, password, confirmPassword }) => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password,confirmPassword }),
        credentials: "include",
      });

      const data = await res.json();
      

      if (data.status !== "success") {
        toast.error(data.message);
        return
      }
      delete data.status

      setAuthUser(data);
      toast.success("Registered successfully!");
      
    } catch (error) {
      toast.error("Login error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

export default useSignUp;
