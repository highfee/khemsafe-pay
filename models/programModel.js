import mongoose from "mongoose";

const programSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  duration: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  students: {
    type: [String],
  },
  count: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Program ||
  mongoose.model("Program", programSchema);
