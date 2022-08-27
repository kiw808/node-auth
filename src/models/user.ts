import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  accessToken?: string;
}

const UserSchema: Schema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  accessToken: { type: String },
});

export default mongoose.model<IUser>("User", UserSchema);
