import slugify from "slugify";
import Quizz from "../models/quizz";
import User from "../models/user";


export const create = async (req, res) => {
    //console.log("CREATE QUIZZ", req.body);
    // return;
    try {
      const alreadyExist = await Quizz.findOne({
        slug: slugify(req.body.title.toLowerCase()),
      });
      if (alreadyExist) return res.status(400).send("Title is taken");
  
      const quizz = await new Quizz({
        slug: slugify(req.body.title),
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

  export const remove = async (req, res) => {
    try {
      const deleted = await Quizz.findOneAndRemove({
        slug: req.params.slug,
      }).exec();
      res.json(deleted);
    } catch (err) {
      console.log(err);
      return res.staus(400).send("Quizz delete failed");
    }
  };
  
  export const read = async (req, res) => {
    console.log(req.body.slug);
    try {
      const quizz = await Quizz.findOne({ slug: req.params.slug })
        .populate("instructor", "_id name")
        .exec();
      res.json(quizz);
    } catch (err) {
      console.log(err);
    }
  };

  export const instructorQuizz = async (req, res) => {
    console.log(req.params.instructor);    
    try {
      const quizz = await Quizz.find({ _id: req.params.instructor })
        .populate("instructor", "_id name")
        .exec();
      res.json(quizz);
    } catch (err) {
      console.log(err);
    }
  };

  export const addQuestion = async (req, res) => {
    try {
      const { slug, instructorId } = req.params;
      const { question, points } = req.body;
  
      if (req.user._id != instructorId) {
        return res.status(400).send("Unauthorized");
      }
  
      const updated = await Quizz.findOneAndUpdate(
        { slug },
        {
          $push: { questions: { question, points, slug: slugify(question) } },
        },
        { new: true }
      )
        .populate("instructor", "_id name")
        .exec();
      res.json(updated);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Add question failed");
    }
  };

  export const addAnswer = async (req, res) => {
    try {
       console.log("UPDATE Answer", req.body);
       //return;
      const { slug } = req.params;
      const { _id, answer, correct } = req.body;
      const quizz = await Quizz.findOne({ slug }).select("instructor").exec();
  
      if (quizz.instructor._id != req.user._id) {
        return res.status(400).send("Unauthorized");
      }
      const id = req.body._id;
      

      const updated = await Quizz.updateOne(
        { "questions._id": _id },
        {
          $push: {
            "questions.$.answers": req.body,            
          },
        },
        { new: true }
      ).exec();
      // console.log("updated", updated);
      res.json(updated);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Update answer failed");
    }
  };

  export const updateQuestion = async (req, res) => {
    try {
      //console.log("UPDATE QUESTION", req.body);       
      const { slug } = req.params;
      const { _id, question, answers, points } = req.body;
      const quizz = await Quizz.findOne({ slug }).select("instructor").exec();
  
      if (quizz.instructor._id != req.user._id) {
        return res.status(400).send("Unauthorized");
      }
  
      const updated = await Quizz.updateOne(
        { "questions._id": _id },
        {
          $set: {
            "questions.$.question": question,
            "questions.$.answers": answers,
            "questions.$.points": points,            
          },
        },
        { new: true }
      ).exec();
      //console.log("updated", updated);
      res.json({ ok: true });
    } catch (err) {
      console.log(err);
      return res.status(400).send("Update lesson failed");
    }
  };

  export const removeQuestion = async (req, res) => {
    const { slug, questionId } = req.params;
    const quizz = await Quizz.findOne({ slug }).exec();
    if (req.user._id != quizz.instructor) {
      return res.status(400).send("Unauthorized");
    }
  
    const deletedQuestion = await Quizz.findByIdAndUpdate(quizz._id, {
      $pull: { questions: { _id: questionId } },
    }).exec();
  
    res.json({ ok: true });
  };
