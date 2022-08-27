import express, { Request, Response } from "express";
import cors from "cors";
import connectDb from "./config/database";
import userRoutes from "./routes/user";
import cookieParser from "cookie-parser";

connectDb();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/api/hello", (req: Request, res: Response) => {
  res.status(200).send("Hello there !");
});

app.use("/api/user", userRoutes);

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
