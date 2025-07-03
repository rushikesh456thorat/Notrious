import { gemini } from "../config/geminiConfig.js";

export const requestToGemini = async (query) => {
    try {
        const response = await fetch(
            `${gemini.apiEndPoint}${gemini.apiKey}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: query }
                            ]
                        }
                    ]
                })
            }
        );

        if (response.ok) {
            const data = await response.json();
            
            // Check if the expected structure exists
            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
                const responseText = data.candidates[0].content.parts[0].text;
                return {
                    isSuccess: true,
                    data: responseText,
                };
            } else {
                throw new Error("Unexpected response structure");
            }
        } else {
            const errorData = await response.text();
            return {
                isSuccess: false,
                message: `Request failed with status ${response.status}: ${response.statusText}`,
                errorData,
            };
        }
    } catch (err) {
        console.error("Error occurred in requestToGemini:", err);
        return {
            isSuccess: false,
            message: `Something went wrong, please try later. ${err.message}`,
        };
    }
};