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
  } from "../controllers/quizz";


router.post("/quizz", requireSignin, isInstructor, create);
router.put("/quizz/:slug", requireSignin, isInstructor, update);
router.get("/quizz/:slug", read);


module.exports = router;