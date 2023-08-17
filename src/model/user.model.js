import mongoose, { Schema, SchemaTypes } from "mongoose";

const UserModel = mongoose.model(
  "User",
  new Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);

export default UserModel;
