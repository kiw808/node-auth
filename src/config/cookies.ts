import { CookieOptions } from "express";

export const jwtCookieOptions: CookieOptions = {
  maxAge: 900000,
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
};
