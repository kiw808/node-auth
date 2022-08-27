import express from "express";
import auth from "../middlewares/auth";
import { register, login, logout, me, getAllUsers } from "../controllers/user";

const router = express();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", auth, logout);
router.get("/me", auth, me);
router.get("/", auth, getAllUsers);

export default router;
