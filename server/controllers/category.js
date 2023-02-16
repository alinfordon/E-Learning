import { nanoid } from "nanoid";
import Course from "../models/course";
import Category from "../models/category";
import SingleFile from "../models/singlefiles";
import slugify from "slugify";
import { readFileSync } from "fs";
import User from "../models/user";



export const create = async (req, res) => {  
    //const {files} = req.body;
    
   // return;
    try {
      const alreadyExist = await Category.findOne({
        slug: slugify(req.body.name.toLowerCase()),
      });
      if (alreadyExist) return res.status(400).send("Title is taken"); 
      //console.log("CREATE COURSE", final_img);    
      const category = await new Category({
        slug: slugify(req.body.name),
        instructor: req.user._id, 
        ...req.body,
      }).save();
      res.json(category);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Module create failed. Try again.");
    }
  };
  
  export const read = async (req, res) => {
    console.log(req.params.slug);
    try {
      const category = await Category.findOne({ slug: req.params.slug })
        .populate("instructor", "_id name")
        .exec();
      res.json(category);
    } catch (err) {
      console.log(err);
    }
  };
  
  export const remove = async (req, res) => {
    try {
      const deleted = await Category.findOneAndRemove({
        slug: req.params.slug,
      }).exec();
      res.json(deleted);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Module delete failed");
    }
  };

  export const categorys = async (req, res) => {
    const all = await Category.find({ published: true })
      .populate("instructor", "_id name")
      .exec();
    res.json(all);
  };