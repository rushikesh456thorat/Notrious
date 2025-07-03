import {toast} from 'react-toastify'
const useGetPageData = () => {

    const getPageData = async (pageId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/retrive/page/${pageId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                credentials: "include",
            });

            const res = await response.json();
           
            if (res.isGenerated) {
                return res.data;
            }

            return null; // Return null if the page data is not generated
        } catch (error) {
            toast.error('Server is offline or network error occurred:', error);
        }
    };

    return { getPageData };
};

export default useGetPageData;