import { Router } from "express";
import {  deleteUser,getUserDetails,registerUser,updateUser,loginUser, getAllUsers } from "../controllers/authController.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/:userID", deleteUser);
router.put("/:userID", updateUser);
router.get("/:userID", getUserDetails);
router.get("/", getAllUsers);



//CRUD VVV
export default router;
