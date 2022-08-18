require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require("cors");
const auth = require("./middleware/auth");
const User = require("./model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Routes
app.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome to my app !");
});

app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!(email && password && firstName && lastName)) {
      res.status(400).send("All inputs are required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User already exists. Please log in");
    }

    encryptedUserPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(),
      password: encryptedUserPassword,
    });

    const token = jwt.sign(
      {
        user_id: user.id,
        email,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "5h" }
    );
    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All inputs are required");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          user_id: user.id,
          email,
        },
        process.env.TOKEN_KEY,
        { expiresIn: "5h" }
      );

      user.token = token;

      return res.status(200).json(user);
    }

    return res.status(400).send("Invalid credentials");
  } catch (err) {
    console.log(err);
  }
});

app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

module.exports = app;
