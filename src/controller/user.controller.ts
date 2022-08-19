import User from "../model/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import config from "../config/config";

const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!(email && password && firstName && lastName)) {
      res.status(400).send("All inputs are required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User already exists. Please log in");
    }

    const encryptedUserPassword = await bcrypt.hash(password, 10);

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
      config.auth.tokenKey,
      { expiresIn: "5h" }
    );
    user.token = token;

    res.status(201).json({
      message: "User created",
      user: {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        token: user.token,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const login = async (req: Request, res: Response) => {
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
        config.auth.tokenKey,
        { expiresIn: "5h" }
      );

      user.token = token;

      return res.status(200).json({
        message: "User logged in",
        user: {
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          token: user.token,
        },
      });
    }

    return res.status(400).send("Invalid credentials");
  } catch (err) {
    console.log(err);
  }
};

const me = async (req: Request, res: Response) => {
  const currentUser = await User.findById(res.locals.jwt.user_id).select([
    "first_name",
    "last_name",
    "email",
  ]);

  res.status(200).json(currentUser);
};

const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find().select(["first_name", "last_name", "email"]);

  res.status(200).json(users);
};

export { register, login, me, getAllUsers };
