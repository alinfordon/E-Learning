import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

function ignoreEmpty (val) {
  if ("" === val) {
    return undefined;
  } else {
    return val
  }
}


const categorySchema = new mongoose.Schema(
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
    language: {
      type: String,      
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    image: {},
    photo: {
      type: String,
    },
    category: String,
    published: {
      type: Boolean,
      default: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    instructor: {
      type: ObjectId,
      ref: "User",
      required: true,
    },    
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
