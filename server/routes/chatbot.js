const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

// Initialize Groq Client
// It automatically checks process.env.GROQ_API_KEY
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

router.post("/ask", async (req, res) => {
    try {
        const { message } = req.body;

        // Using Llama 3.3 70B Versatile for best balance of reasoning and speed
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are BikeBuddy, a helpful assistant for a Bike Rental website. You help users find bikes, understand rental policies, and navigate the site. Keep answers concise and friendly."
                },
                {
                    role: "user",
                    content: message,
                },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.5,
            max_tokens: 1024,
        });

        const reply = completion.choices[0]?.message?.content || "Sorry, I couldn't understand that.";
        res.json({ reply });

    } catch (error) {
        console.error("Groq API Error:", error);
        res.status(500).json({ reply: "Sorry, I am having trouble connecting to my brain right now." });
    }
});

module.exports = router;
