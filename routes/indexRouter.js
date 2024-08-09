import express from "express";
import {
  createUser,
  readAllUser,
  readOneUser,
  readOneUserByName,
  updateUser,
  deleteUser,
  userSignIn,
  checkToken,
} from "../controllers/indexController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from index router");
});

router.post("/create", createUser);

router.get("/read", readAllUser);

router.get("/readOne/:userId", readOneUser);

router.get("/readOnebyName", readOneUserByName);

router.put("/update/:userId", updateUser);

router.delete("/delete/:userId", deleteUser);

router.post("/signIn", userSignIn);

router.get("/protected", isAuthenticated, (req, res) => {
  res.send("this is protected route");
});

router.post("/checkValidToken", checkToken);

export default router;
