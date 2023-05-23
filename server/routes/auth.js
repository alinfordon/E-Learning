import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";

// controllers
import {
  register,
  login,
  logout,
  currentUser,
  currentAdmin,
  forgotPassword,
  resetPassword,
  findUser,
  addAdminRole,
  deleteAdminRole,
  users,
} from "../controllers/auth";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);
router.get("/users", requireSignin, users);
router.get("/current-admin", requireSignin, currentAdmin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/find-user", requireSignin, findUser);
router.post("/admin/add-role", requireSignin, addAdminRole);
router.post("/delete/999U999", requireSignin, deleteAdminRole);

module.exports = router;
