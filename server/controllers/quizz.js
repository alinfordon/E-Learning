import slugify from "slugify";
import Quizz from "../models/quizz";
import User from "../models/user";


export const create = async (req, res) => {
     console.log("CREATE QUIZZ", req.body);
     return;
    try {
      const alreadyExist = await Quizz.findOne({
        slug: slugify(req.body.name.toLowerCase()),
      });
      if (alreadyExist) return res.status(400).send("Title is taken");
  
      const quizz = await new Quizz({
        slug: slugify(req.body.name),
        instructor: req.user._id,
        ...req.body,
      }).save();
  
      res.json(quizz);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Quizz create failed. Try again.");
    }
  };

  export const update = async (req, res) => {
    try {
      const { slug } = req.params;
      // console.log(slug);
      const quizz = await Quizz.findOne({ slug }).exec();
      // console.log("COURSE FOUND => ", course);
      if (req.user._id != quizz.instructor) {
        return res.status(400).send("Unauthorized");
      }
  
      const updated = await Quizz.findOneAndUpdate({ slug }, req.body, {
        new: true,
      }).exec();
  
      res.json(updated);
    } catch (err) {
      console.log(err);
      return res.status(400).send(err.message);
    }
  };
  
  export const read = async (req, res) => {
    console.log(req.params.slug);
    try {
      const quizz = await Quizz.findOne({ slug: req.params.slug })
        .populate("instructor", "_id name")
        .exec();
      res.json(quizz);
    } catch (err) {
      console.log(err);
    }
  };
