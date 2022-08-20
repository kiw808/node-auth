import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, config.auth.tokenKey);
    res.locals.jwt = decoded;
  } catch (err) {
    return res.status(401).send("Invalid token");
  }

  return next();
};

export default verifyToken;
