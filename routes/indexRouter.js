import express from "express";
import {
  createUser,
  readAllUser,
  readOneUser,
  readOneUserByName,
  updateUser,
  deleteUser
} from "../controllers/indexController.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from index router");
});

router.post("/create", createUser);

router.get("/read", readAllUser);

router.get("/readOne/:userId", readOneUser);

router.get("/readOnebyName", readOneUserByName);

router.put("/update/:userId", updateUser)

router.delete("/delete/:userId", deleteUser)

export default router;
