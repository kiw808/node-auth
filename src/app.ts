import express, { Request, Response } from "express";
import cors from "cors";
import connectDb from "./config/database";

connectDb();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/hello", (req: Request, res: Response) => {
  res.status(200).send("Hello there !");
});

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

export default app;
