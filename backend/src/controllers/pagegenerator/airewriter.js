import { requestToGemini } from '../../services/geminiService.js';

const AiRewriter = async (req, res) => {
    try {
        const { content, title } = req.body;
        const user = req.user
        console.log("Received Input:", { content, title });

        if (!user) {
            return res.status(401).json({
                isSuccess: 'fail',
                message: 'Unauthorized access.',
            });
        }


        if (!content || !title) {
            return res.status(400).json({
                isSuccess: 'fail',
                message: 'Both content and title are required.',
            });
        }

        const prompt = `User Thought: ${content}\nProduct Title: ${title}\n\nIf the input is relevant, rewrite the thought to enhance its clarity and relevance to the product. If the input is irrelevant, respond with an "Error".`;

        const reply = (await requestToGemini(prompt)).data;

        if (!reply || reply.includes('Error')) {
            return res.status(400).json({
                isSuccess: 'fail',
                message: 'The input content is irrelevant or could not be processed.',
            });
        }

        return res.status(200).json({
            isSuccess: 'success',
            message: 'Successfully improved content',
            data: reply,
        });
    } catch (error) {
        console.error("Error in AiRewriter:", error);
        return res.status(500).json({
            isSuccess: 'fail',
            message: 'An internal server error occurred.',
        });
    }
};

export default AiRewriter;
