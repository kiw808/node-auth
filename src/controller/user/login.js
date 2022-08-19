const User = require("../../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
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

      const cookieOptions = {
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: false,
      };

      return res
        .status(200)
        .cookie("accessToken", token, cookieOptions)
        .json(user);
    }

    return res.status(400).send("Invalid credentials");
  } catch (err) {
    console.log(err);
  }
};

module.exports = login;
