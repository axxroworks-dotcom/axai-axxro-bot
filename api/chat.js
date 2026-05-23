import { Groq } from 'groq-sdk';

const groq = new Groq({
    apiKey: 'YOUR_GROQ_API_KEY'
});

export default async function handler(req, res) {

    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // OPTIONS fix
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only POST
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }

    try {

        const { messages } = req.body;

        console.log("Messages received");

        const completion = await groq.chat.completions.create({
            messages,
            model: 'llama-3.3-70b-versatile'
        });

        const aiReply =
            completion.choices[0].message.content;

        return res.status(200).json({
            reply: aiReply
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: error.message
        });
    }
}
