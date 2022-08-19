import mongoose from "mongoose";
import config from "./config";

export default function connectDb() {
  mongoose
    .connect(config.database.uri)
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("Database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
}
