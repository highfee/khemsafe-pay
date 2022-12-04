import dbConnect from "../../../db";
import Program from "../../../models/programModel";
import Student from "../../../models/studentModel";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    let { search } = req.query;
    if (search) {
      let student = await Student.find({
        $or: [
          { fullName: { $regex: search, $options: "i" } },
          { regNumber: search },
        ],
      });
      return res.json(student);
    }

    let students = await Student.find().limit();
    res.status(200).json(students);
  }

  if (req.method === "POST") {
    try {
      const student = new Student(req.body);
      await student.save();
      await Program.findOneAndUpdate(
        {
          name: req.body.program,
        },
        { $inc: { count: 1 } }
      );
      res.json({ ...student._doc, message: "program count have been updated" });
    } catch (error) {
      res.send(error);
    }
  }
}
