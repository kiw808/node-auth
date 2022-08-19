import express from "express";
import auth from "../middleware/auth";
import {
  register,
  login,
  me,
  getAllUsers,
} from "../controller/user.controller";

const router = express();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, me);
router.get("/", auth, getAllUsers);

export default router;
