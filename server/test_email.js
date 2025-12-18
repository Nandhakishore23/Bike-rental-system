require('dotenv').config();
const { sendWelcomeEmail } = require("./utils/mailer");

console.log("🚀 Attempting to send test email to nandha23kishore@gmail.com...");

// Check if env vars are present
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ ERROR: EMAIL_USER or EMAIL_PASS is missing in .env file.");
    process.exit(1);
}

sendWelcomeEmail("nandha23kishore@gmail.com", "Nandha (Test)")
    .then(() => console.log("✅ Test script executed. Check console for success/error message."))
    .catch(err => console.error("❌ Script execution failed:", err));
