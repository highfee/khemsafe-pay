import dbConnect from "../../../db";
import Program from "../../../models/programModel";
import Student from "../../../models/studentModel";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;
  await dbConnect();

  if (method === "GET") {
    let student = await Student.findById(id);
    let program = await Program.findOne({ name: student.program });
    let { _id, ...others } = program._doc;
    res
      .status(200)
      .json({ ...student._doc, programId: program._id, ...others });
  }

  if (method === "PUT") {
    let purpose = req.body.purpose;
    if (purpose === "setFinished") {
      await Student.findByIdAndUpdate(
        id,
        { $set: { status: false } },
        { new: true }
      );
      let student = await Student.findById(id);
      await Program.findOneAndUpdate(
        { name: student.program },
        { $inc: { count: -1 } }
      );
      return;
    }

    await Student.findByIdAndUpdate(
      id,
      {$push: {receiptNumber: req.body.receiptNumber}},
      // { $set: {totalAmountPaid: req.body.totalAmountPaid}},
      // { new: true }
    );
    await Student.findByIdAndUpdate(
      id,
      // {$push: {receiptNumber: req.body.receiptNumber}},
      { $set: {totalAmountPaid: req.body.totalAmountPaid}},
      { new: true }
    );
    res.send(req.body.receiptNumber)
  }
}
// totalAmountPaid: req.body.totalAmountPaid, 
