import express from "express";
import formidable from "express-formidable";

const router = express.Router();

// middleware
import { requireSignin, isInstructor } from "../middlewares";

// controllers
import {  
  categorys,
  create,
  read,
  remove,
  
} from "../controllers/category";

router.get("/categorys", categorys);

// course
router.post("/category", requireSignin, isInstructor, create);
router.delete("/category/:slug", requireSignin, isInstructor, remove);
router.get("/category/:slug", read);


module.exports = router;