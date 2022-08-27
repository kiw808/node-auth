import User from "../models/user";
import { TUser } from "../types/user";

async function create(user: TUser) {
  return await User.create({
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email.toLowerCase(),
    password: user.encryptedUserPassword,
  });
}

async function findByEmail(email: string) {
  return await User.findOne({ email });
}

async function findById(id: string) {
  return await User.findById(id).select(["first_name", "last_name", "email"]);
}

async function findAll() {
  return await User.find().select(["first_name", "last_name", "email"]);
}

const userService = { create, findById, findByEmail, findAll };

export default userService;
