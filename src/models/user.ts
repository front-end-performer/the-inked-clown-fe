import { Schema, model, models } from "mongoose";

export interface UserInterface {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
  isVerifiedEmail: boolean;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserInterface>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    name: {
      type: String,
      required: [true, "Fullname is required"],
      minLength: [3, "fullname must be at least 3 characters"],
      maxLength: [25, "fullname must be at most 25 characters"],
    },
    role: {
      type: String,
      default: "admin",
    },
    avatar: { type: String, default: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    isVerifiedEmail: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model<UserInterface>("User", UserSchema);
export default User;