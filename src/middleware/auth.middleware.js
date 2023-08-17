import jwt from "jsonwebtoken";
import UserModel from "../model/user.model.js";
import RoleModel from "../model/role.model.js";
import config from "../config/index.js";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({ message: "No token provided" });
    }

    jwt.verify(token, config.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Not authorized" });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export const checkRoles = (roleName) => async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.userId).exec();
    const roles = await RoleModel.find({ _id: { $in: user.roles } }).exec();

    if (!user || roles.length === 0) {
      return res.status(500).send({ message: "Internal server error" });
    }

    const hasRequestedRole = roles.some((role) => role.name === roleName);
    if (!hasRequestedRole) {
      return res.status(403).send({ message: "Access denied" });
    }

    next();
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};
