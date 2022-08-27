import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(
      accessToken,
      config.auth.tokenSecret
    ) as JwtPayload;

    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid token");
  }

  return next();
};

export default verifyToken;
