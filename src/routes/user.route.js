import { verifyToken, checkRoles } from "../middleware/auth.middleware.js";
import {
  userBoard,
  adminBoard,
  moderatorBoard,
  allAccess,
} from "../controller/user.controller.js";

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", allAccess);
  app.get("/api/test/user", verifyToken, userBoard);
  app.get(
    "/api/test/mod",
    [verifyToken, checkRoles("moderator")],
    moderatorBoard
  );
  app.get("/api/test/admin", [verifyToken, checkRoles("admin")], adminBoard);
}
