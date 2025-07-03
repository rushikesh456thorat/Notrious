import {useState} from 'react'

const useUpdatePageData = () => {

    const [loading,setLoading] = useState()

    const updatePageData = async ({ pageId, type, index, newData }) => {

        try {
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/generator/page/update/${pageId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type, index, newData }),
                credentials: "include",
            })

            const res = await response.json()
            console.log(res.message)

        } catch (error) {
            console.error(error)
        }finally{
            setLoading(false)
        }

    }

    return {updatePageData,loading}


}
export default useUpdatePageData