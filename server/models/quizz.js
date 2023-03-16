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
      feedback: {
        type: String,
        trim: true, 
      },
      chekd: {
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
      required: true,
    }, 
    slug: {
      type: String,
      lowercase: true,
    },       
    answers: [answersSchema],
    points: {
        type: Number,
        default: 0,
    },  
    grade: {
      type: Number,
      default: 0,
    },   
    feedbackp: {
      type: String,
      trim: true, 
    }, 
    feedbackn: {
      type: String,
      trim: true, 
    },  
    isCheck: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const quizzSchema = new mongoose.Schema(
  {
    title: {
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
    },    
    published: {
      type: Boolean,
      default: false,
    },  
    hotspot: {
      type: Boolean,
      default: false,
    },
    grade: {
      type: Number,
      default: 0,
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
