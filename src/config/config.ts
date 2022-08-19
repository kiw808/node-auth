import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

const SERVER_PORT = process.env.SERVER_PORT || 4001;

const TOKEN_KEY = process.env.TOKEN_KEY || "supersecret";

const config = {
  database: {
    uri: MONGO_URI,
  },
  server: {
    port: SERVER_PORT,
  },
  auth: {
    tokenKey: TOKEN_KEY,
  },
};

export default config;
