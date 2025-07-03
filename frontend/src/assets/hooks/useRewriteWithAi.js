import { toast } from "react-toastify";

const useRewriterWithAi = () => {
    const rewriterWithAi = async (content, title) => {
        try {
            console.log("Sending to backend:", { content, title });
            
            const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/generator/page/aiagent`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({ content, title }),
            });

            console.log("Backend Response:", response);

            if (!response.ok) {
                // Log detailed error info for debugging
                const errorDetails = await response.json();
                toast.error("Error Response from Backend:", errorDetails);
                return;
            }

            const res = await response.json();

            if (res.isSuccess === 'fail') {
                toast.error(res.message);
            } else {
                return res.data;
            }
        } catch (error) {
            toast.error("Error occurred during AI agent call:", error);
        }
    };

    return { rewriterWithAi };
};

export default useRewriterWithAi;
