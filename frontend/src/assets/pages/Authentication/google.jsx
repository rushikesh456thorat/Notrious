import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "../../zustand/useAuthStore";

const GoogleLogin = () => {
    const setAuthUser = useAuthStore((state) => state.setAuthUser);
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("googleButton"),
      { theme: "outline", size: "large" }
    );
  }, []);

  const handleCredentialResponse = async (response) => {
    const token = response.credential; // JWT
    const res = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
      credentials: "include",
    });

    const data = await res.json();
    console.log(data)
    if (data.status === "success") {
      toast.success('User logged in successfully');
      delete data.status
      setAuthUser(data);
      // Save user in context/localStorage
    } else {
      console.log("Authentication failed");
    }
  };

  return <div id="googleButton"></div>;
};

export default GoogleLogin;
