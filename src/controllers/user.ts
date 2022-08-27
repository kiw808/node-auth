import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import config from "../config/config";
import userService from "../services/user";
import { jwtCookieOptions } from "../config/cookies";

const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!(email && password && firstName && lastName)) {
      res.status(400).send("All inputs are required");
    }

    const oldUser = await userService.findByEmail(email);

    if (oldUser) {
      return res.status(409).send("User already exists. Please log in");
    }

    const encryptedUserPassword = await bcrypt.hash(password, 10);

    const user = await userService.create({
      firstName,
      lastName,
      email,
      encryptedUserPassword,
    });

    const accessToken = jwt.sign(
      {
        user_id: user.id,
        email,
      },
      config.auth.tokenSecret,
      { expiresIn: "15m" }
    );
    user.accessToken = accessToken;

    res.status(201).json({
      message: "User created",
      user: {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        token: user.accessToken,
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

    const user = await userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          userId: user.id,
          email,
        },
        config.auth.tokenSecret,
        { expiresIn: "15m" }
      );

      user.accessToken = accessToken;

      return res
        .status(200)
        .cookie("accessToken", accessToken, jwtCookieOptions)
        .json({
          message: "User logged in",
          user: {
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            accessToken: user.accessToken,
          },
        });
    }

    return res.status(400).send("Invalid credentials");
  } catch (err) {
    console.log(err);
  }
};

const logout = async (req: Request, res: Response) => {
  return res.clearCookie("accessToken").status(200).json({
    message: "Successfully logged out",
  });
};

const me = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }

  try {
    const currentUser = await userService.findById(user.userId);

    res.status(200).json(currentUser);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getAllUsers = async (_: Request, res: Response) => {
  const users = await userService.findAll();

  res.status(200).json(users);
};

export { register, login, logout, me, getAllUsers };
