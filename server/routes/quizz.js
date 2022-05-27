import express from "express";
import formidable from "express-formidable";

const router = express.Router();

// middleware
import { requireSignin, isInstructor, isEnrolled } from "../middlewares";


// controllers
import {    
    create,
    read,  
    update,  
    addQuestion,
    addAnswer,
    updateQuestion,
    removeQuestion,
  } from "../controllers/quizz";

//Quizz
router.post("/quizz", requireSignin, isInstructor, create);
router.put("/quizz/:slug", requireSignin, isInstructor, update);
router.get("/quizz/:slug", read);
//Question
router.post("/quizz/question/:slug/:instructorId", requireSignin, addQuestion);
router.put("/quizz/answer/:slug/:instructorId", requireSignin, addAnswer);
router.put("/quizz/question/:slug/:instructorId", requireSignin, updateQuestion);
router.put("/quizz/:slug/:questionId", requireSignin, removeQuestion);


module.exports = router;