import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";

// controllers
import {
  makeInstructor,
  getAccountStatus,
  currentInstructor,
  instructorCourses,
  instructorQuizzes,
  instructorAllQuizzes,
  studentCount,
  instructorBalance,
  instructorPayoutSettings,
  addInstructorRole,
  deleteInstructorRole,
} from "../controllers/instructor";

router.post("/make-instructor", requireSignin, makeInstructor);
router.post("/add-instructor", requireSignin, addInstructorRole);
router.post("/delete/Instructor", requireSignin, deleteInstructorRole);
router.post("/get-account-status", requireSignin, getAccountStatus);
router.get("/current-instructor", requireSignin, currentInstructor);

router.get("/instructor-courses", requireSignin, instructorCourses);
router.get("/instructor-quizzes", requireSignin, instructorQuizzes);
router.get("/instructor-all-quizzes", requireSignin, instructorAllQuizzes);

router.post("/instructor/student-count", requireSignin, studentCount);

router.get("/instructor/balance", requireSignin, instructorBalance);

router.get(
  "/instructor/payout-settings",
  requireSignin,
  instructorPayoutSettings
);

module.exports = router;
