import express from "express";
import cors from "cors";
import "dotenv/config.js";
import config from "./config/index.js";
import connectToDatabase from "./database/connect.js";
import { default as authRoutes } from "./routes/auth.route.js";
import { default as userRoutes } from "./routes/user.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDatabase();

app.get("/", (req, res) => {
  res.send("Server is running!");
});

authRoutes(app);
userRoutes(app);

app.listen(config.PORT, () => {
  console.log(`[server] listening at http://localhost:${config.PORT}`);
});
