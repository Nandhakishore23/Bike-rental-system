const nodemailer = require("nodemailer");

const sendWelcomeEmail = async (email, username) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Welcome to BikeBuddy! 🚲",
            html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      h1 {
        color: #2b7a78;
        text-align: center;
      }
      p {
        font-size: 15px;
        line-height: 1.6;
        color: #333333;
      }
      .steps {
        background: #f0f8ff;
        padding: 12px;
        border-radius: 8px;
        margin-top: 15px;
      }
      .steps li {
        margin: 8px 0;
      }
      .footer {
        margin-top: 20px;
        font-size: 13px;
        text-align: center;
        color: #777777;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome to BikeBuddy 🚲</h1>
      <p>Hi <b>${username}</b>,</p>
      <p>
        🎊 Your account has been created successfully!  
        You can now easily explore, book, and enjoy our wide range of bikes at the best prices.
      </p>
      <div class="steps">
        <p><b>👉 Next Steps:</b></p>
        <ul>
          <li>Browse available bikes anytime</li>
          <li>Book your ride in just a few clicks</li>
          <li>Enjoy safe, reliable, and affordable rentals</li>
        </ul>
      </div>
      <p>We’re excited to have you with us! 🚴💨</p>
      <div class="footer">
        <p>Happy Riding,<br>The BikeBuddy Team</p>
      </div>
    </div>
  </body>
</html>
      `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent: " + info.response);
    } catch (error) {
        console.error("❌ Email sending failed:", error);
    }
};

module.exports = { sendWelcomeEmail };
