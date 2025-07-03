import { useState } from "react"
import { toast } from "react-toastify"


const useCreatePage=()=>{
    const [loading,setLoading] = useState()
    const createPage=async()=>{
          try{
            setLoading(true)
            const res = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/generator/page/create`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
            })

            const responseBody = await res.json(); // Parse response as JSON

            if (responseBody.status === 'success') { // Check if request was successful
                const pageId = responseBody.id; // Assuming responseBody contains the `id`
                return pageId; // Return the generated page ID
            } else {
                toast.error(responseBody.message || 'Unknown error');
            }
          }catch(error){
            toast.error('Error:',error)
          }finally{
            setLoading(false)
          }
    }
    return {loading,createPage}
}

export default useCreatePage