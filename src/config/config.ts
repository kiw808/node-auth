import dotenv from "dotenv";

dotenv.config();

const MONGO_USER = process.env.MONGO_USER || ""
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ""
const MONGO_DATABASE = process.env.MONGO_DATABASE || ""

const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@127.0.0.1:27017/${MONGO_DATABASE}`;

const SERVER_PORT = process.env.SERVER_PORT || 4001;

const TOKEN_SECRET = process.env.TOKEN_SECRET || "supersecret";

const config = {
  database: {
    uri: MONGO_URI,
  },
  server: {
    port: SERVER_PORT,
  },
  auth: {
    tokenKey: TOKEN_SECRET,
  },
};

export default config;
