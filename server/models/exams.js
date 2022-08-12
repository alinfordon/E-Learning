import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const examsSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },   
    instructor: {
        type: ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 320,
        required: true,
    },
    grade: {
        type: Number,
        default: 0,
    }, 
    questions: [],
  },
  { timestamps: true }
);

export default mongoose.model("Exams", examsSchema);