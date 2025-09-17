// // const express = require("express");
// // const router = express.Router();
// // const User = require("../models/userModel");
// // const bcrpyt = require("bcrypt");

// // //REGISTER
// // router.post("/register", async (req, res) => {
// //   try {
// //     const salt = await bcrpyt.genSalt(10);
// //     const hashedPass = await bcrpyt.hash(req.body.password, salt);
// //     const newUser = new User({
// //       username: req.body.username,
// //       password: hashedPass,
// //     });

// //     const user = await newUser.save();
// //     res.status(200).json(user);
// //   } catch (err) {
// //     res.status(500).json(err);
// //   }
// // });

// // //LOGIN
// // router.post("/login", async (req, res) => {
// //   try {
// //     const user = await User.findOne({ username: req.body.username });
// //     if (user) {
// //       const validate = await bcrpyt.compare(req.body.password, user.password);
// //       if (validate) {
// //         res.send(user);
// //       } else {
// //         return res.status(400).json(error);
// //       }
// //     } else {
// //       return res.status(400).json(error);
// //     }
// //   } catch (err) {
// //     res.status(500).json(err);
// //   }
// // });

// // module.exports = router;


// const express = require("express");
// const router = express.Router();
// const User = require("../models/userModel");
// const bcrypt = require("bcrypt");
// const axios = require("axios");

// // REGISTER
// router.post("/register", async (req, res) => {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPass = await bcrypt.hash(req.body.password, salt);

//     const newUser = new User({
//       username: req.body.username,
//       email: req.body.email, // ✅ added email
//       password: hashedPass,
//     });

//     const user = await newUser.save();

//     // 🔗 Call n8n webhook to send welcome email
//     try {
//       await axios.post("https://n8n-a84j.onrender.com/webhook/user-register", {
//         name: user.username,
//         email: user.email,
//       });
//     } catch (err) {
//       console.error("Error triggering n8n webhook:", err.message);
//     }

//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // LOGIN
// router.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     if (user) {
//       const validate = await bcrypt.compare(req.body.password, user.password);
//       if (validate) {
//         res.send(user);
//       } else {
//         return res.status(400).json({ error: "Invalid credentials" });
//       }
//     } else {
//       return res.status(400).json({ error: "User not found" });
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const axios = require("axios");


router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // console.log("Incoming request body:", req.body);

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // Save new user
    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });


    const user = await newUser.save();
    // console.log("✅ New user registered:", user.email);

    // 🔗 Call n8n webhook to send welcome email
    try {
      await axios.post("https://n8n-a84j.onrender.com/webhook/user-register", {
        name: user.username,
        email: user.email,
      });
      console.log("✅ Welcome email webhook triggered for:", user.email);
    } catch (err) {
      console.error("❌ Error triggering n8n webhook:", err.message);
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("❌ Register Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});



// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const validate = await bcrypt.compare(password, user.password);
    if (!validate) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("❌ Login Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
