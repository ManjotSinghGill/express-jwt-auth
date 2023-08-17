import UserModel from "../model/user.model.js";
import db from "../model/index.js";

export const checkDuplicateUser = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (user) {
      return res.status(400).send({ message: "User already exists" });
    }

    next();
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export const checkExistingRoles = async (req, res, next) => {
  try {
    if (req.body.roles) {
      const receivedRoles = req.body.roles;
      for (let i = 0; i < receivedRoles.length; i++) {
        if (!db.ROLES.includes(receivedRoles[i])) {
          return res
            .status(400)
            .send({ message: `Role does not exist: ${receivedRoles[i]}` });
        }
      }
    }
    next();
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
