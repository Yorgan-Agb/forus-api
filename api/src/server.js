import express from "express";
import "dotenv/config";
import cors from "cors";
import { jwtCheck } from "./middlewares/auth.middleware.js";
import { getUserFromToken } from "./middlewares/auth.middleware.js";
import { userRouter } from "./routes/user.route.js";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// app.use("/auth", authRouter);
app.use("/users", userRouter);
app.get("/test-auth", jwtCheck, getUserFromToken, (req, res) => {
  res.json(req.auth);
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/register", jwtCheck);
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
