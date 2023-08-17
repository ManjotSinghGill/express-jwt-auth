import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModel from "../model/user.model.js";
import RoleModel from "../model/role.model.js";
import config from "../config/index.js";

export const signup = async (req, res) => {
  try {
    const user = await new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    }).save();

    const roles = await RoleModel.find({
      name: { $in: req.body.roles ?? ["user"] },
    });

    user.roles = roles.map((role) => role._id);
    await user.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export const signin = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }],
    }).populate("roles", "-__v");

    if (!user) {
      return res.status(404).send({ message: "User does not exist" });
    }

    const passwordMatched = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordMatched) {
      return res.status(401).send({
        messaged: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user.id }, config.SECRET, {
      allowInsecureKeySizes: true,
      expiresIn: 84600,
    });

    const roles = user.roles.map((roles) => roles.name.toUpperCase());

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles,
      token,
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
