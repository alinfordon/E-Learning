import express from "express";
import formidable from "express-formidable";

const router = express.Router();

// middleware
import { requireSignin, isInstructor, isEnrolled } from "../middlewares";


// controllers
import {    
    create,
    read,  
    lessonQuizz,
    instructorQuizz,
    update,
    remove,  
    addQuestion,
    addAnswer,
    updateQuestion,
    removeQuestion,
    publishQuizz,
    unpublishQuizz,
  } from "../controllers/quizz";

//Quizz
router.post("/quizz", requireSignin, isInstructor, create);
router.put("/quizz/:slug", requireSignin, isInstructor, update);
router.delete("/quizz/:slug", requireSignin, isInstructor, remove);
router.get("/quizz/:slug", read);
router.put("/quizzForLesson", lessonQuizz);
router.get("/quizz/:instructorId", instructorQuizz);
//Question
router.post("/quizz/question/:slug/:instructorId", requireSignin, addQuestion);
router.put("/quizz/answer/:slug/:instructorId", requireSignin, addAnswer);
router.put("/quizz/question/:slug/:instructorId", requireSignin, updateQuestion);
router.put("/quizz/:slug/:questionId", requireSignin, removeQuestion);
// publish unpublish
router.put("/publish-quizz/:quizzId", requireSignin, isInstructor, publishQuizz);
router.put("/unpublish-quizz/:quizzId", requireSignin, unpublishQuizz);


module.exports = router;