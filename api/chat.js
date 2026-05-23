const Groq = require('groq-sdk');

const groq = new Groq({
    apiKey: 'YOUR_GROQ_KEY'
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

        const completion =
            await groq.chat.completions.create({
                messages,
                model: 'llama-3.3-70b-versatile'
            });

        return res.status(200).json({
            reply:
                completion.choices[0].message.content
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: error.message
        });
    }
}
