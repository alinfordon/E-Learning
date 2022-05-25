import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const answersSchema = new mongoose.Schema(
    {
        answer: {
        type: String,
        trim: true,        
        required: true,
      },      
      correct: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

const questionsSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 320,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },    
    answers: [answersSchema],
    pionts: {
        type: Numeric,
        default: 0,
    },
    correct: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const quizzSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 320,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: {},
      minlength: 200,
      required: true,
    },    
    published: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: true,
    },
    instructor: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    questions: [questionsSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Quizz", quizzSchema);
