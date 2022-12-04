import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  fullName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },
  tel: {
    type: Number,
  },
  regNumber: {
    type: String,
    // unique: true,
    require: true,
  },
  dob: {
    type: Date,
  },
  maritalStatus: {
    type: String,
  },
  nationality: {
    type: String,
  },
  address: {
    type: String,
  },
  program: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  duration: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  amountTobePaid: {
    type: Number,
  },
  totalAmountPaid: {
    type: Number,
    default: 0,
  },
  amountPaid: {
    type: Number,
  },
  receiptNumber: {
    type: [String],
    default: [],
  },
});

export default mongoose.models.Student ||
  mongoose.model("Student", studentSchema);
