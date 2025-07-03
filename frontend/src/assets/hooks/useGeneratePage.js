import { toast } from "react-toastify";

const useGeneratePage = () => {

    const generatePage = async (productUrl, pageId) => {
        
        try {
            const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/generator/page/${pageId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify({ productUrl }), // Stringify the request body
            });

            const responseBody = await response.json(); // Parse response as JSON

            console.log(responseBody);

            if (responseBody.status === 'success' && response.ok) { // Check if request was successful
                return responseBody.data;
            } else {
                toast.error('Error:', responseBody.message || 'Unknown error');
            }
        } catch (error) {
            toast.error('Server is offline or network error occurred:', error);
        }

        return null; // Return null if the operation failed
    };

    return { generatePage };
};

export default useGeneratePage;