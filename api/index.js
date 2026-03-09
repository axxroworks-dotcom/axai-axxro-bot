const express = require('express');
const cors = require('cors');
const { Groq } = require('groq-sdk');

const app = express();
app.use(cors());
app.use(express.json());

// API KEY CHECK: Yahan apni key lazmi check karein
const groq = new Groq({ apiKey: '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' });

app.post('/chat', async (req, res) => {
    try {
        const { messages } = req.body; 
        console.log("Received messages from frontend...");

        const completion = await groq.chat.completions.create({
            messages: messages, // Frontend training passing here
            model: "llama-3.3-70b-versatile",
        });

        const aiReply = completion.choices[0].message.content;
        res.json({ reply: aiReply });
    } catch (error) {
        console.error("SERVER ERROR:", error.message);
        res.status(500).json({ reply: "Server error: " + error.message });
    }
});

// app.listen hata dein aur ye likhein:
module.exports = app;