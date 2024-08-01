import express from "express";
import {
  createUser,
  readAllUser,
  readOneUser,
  readOneUserByName,
} from "../controllers/indexController.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from index router");
});

router.post("/create", createUser);

router.get("/read", readAllUser);

router.get("/readOne/:userId", readOneUser);

router.get("/readOnebyName", readOneUserByName);

export default router;
