import UserModel from "./user.model.js";
import RoleModel from "./role.model.js";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = UserModel;
db.role = RoleModel;

db.ROLES = ["user", "moderator", "admin"];

export default db;
