const Groq = require('groq-sdk');

const groq = new Groq({
    apiKey: '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'
});

module.exports = async function handler(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }

    try {

        const { messages } = req.body;

        console.log("MESSAGES:", messages);

        const completion =
            await groq.chat.completions.create({
                messages,
                model: 'llama-3.3-70b-versatile'
            });

        console.log("FULL COMPLETION:", completion);

        const aiReply =
            completion?.choices?.[0]?.message?.content
            || "No AI response generated.";

        return res.status(200).json({
            reply: aiReply
        });

    } catch (error) {

        console.error("BACKEND ERROR:", error);

        return res.status(500).json({
            error: error.message
        });
    }
}
