import mongoose, { mongo } from "mongoose";

const RoleModel = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String,
  })
);

export default RoleModel;
