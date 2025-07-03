import { useState } from "react";
import { toast } from "react-toastify";

const usePublishPage = () => {

  const [loading, setLoading] = useState(false);

  const publishPage = async (id) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}/api/publish/page/shopify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
          credentials: "include",
        }
      );

      const result = await response.json();

      if (result.message === "failed") {
        toast.error("Publishing failed. Please try again.");
        return null;
      }

      toast.success(result.message);
      return result;

    } catch (error) {
      toast.error("An error occurred while publishing the page.");
      console.error(error);
      return null;
    } finally {
      setLoading(false);
    }
  };


  return { publishPage, loading };
};

export default usePublishPage;
