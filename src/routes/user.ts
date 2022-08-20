import express from "express";
import auth from "../middlewares/auth";
import { register, login, me, getAllUsers } from "../controllers/user";

const router = express();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, me);
router.get("/", auth, getAllUsers);

export default router;
