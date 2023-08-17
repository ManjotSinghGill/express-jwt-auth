import {
  checkExistingRoles,
  checkDuplicateUser,
} from "../middleware/signup.middleware.js";
import { signup, signin } from "../controller/auth.controller.js";

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [checkDuplicateUser, checkExistingRoles],
    signup
  );

  app.post("/api/auth/signin", signin);
}
