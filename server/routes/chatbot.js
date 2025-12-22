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
        const { message, userContext } = req.body;

        const systemPrompt = `You are BikeBuddy, the AI support for a premium bike rental platform.
        
        Current User Context:
        - Name: ${userContext?.name || "Guest"}
        - Age: ${userContext?.age || "Unknown"}
        - Verified Status: ${userContext?.isVerified ? "✅ Verified User" : "❌ Unverified (Guest)"}
        
        Guidelines:
        1. Name: You are "BikeBuddy".
        2. Personalization:
           - If user is verified and >21, suggest high-performance bikes (Hayabusa, H2R).
           - If user is unverified, strictly advise them to complete their profile (License, Aadhaar) before booking.
           - If user is young (<21), recommend safe, lower-cc bikes.
        3. Tone: Friendly, concise, helpful.
        4. Length: KEEP ANSWERS EXTREMELY SHORT. Maximum 2 sentences. No lists unless asked.
        
        Answer the user's question '${message}' based on this context.`;

        // Using Llama 3.3 70B Versatile for best balance of reasoning and speed
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: message,
                },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.5,
            max_tokens: 150,
        });

        const reply = completion.choices[0]?.message?.content || "Sorry, I couldn't understand that.";
        res.json({ reply });

    } catch (error) {
        console.error("Groq API Error:", error);
        res.status(500).json({ reply: "Sorry, I am having trouble connecting to my brain right now." });
    }
});

module.exports = router;
