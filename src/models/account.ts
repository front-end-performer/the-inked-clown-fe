import { Schema, models, model } from "mongoose";

export interface AccountInterface {
  _id: string;
  provider: string;
  type: string;
  providerAccountId: string;
  access_token: string;
  scope: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const AccountSchema = new Schema({
  id: { type: Schema.ObjectId },
  provider: { type: String, default: "the-inked-clown" },
  type: { type: String, default: "credentials" },
  providerAccountId: { type: String, default: "01" },
  access_token: { type: String, default: "" },
  scope: { type: String, default: "all" },
  userId: { type: Schema.ObjectId, ref: "User" },
});

const AccountModel = models.Account || model("Account", AccountSchema);

export default AccountModel;
