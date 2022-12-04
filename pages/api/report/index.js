import dbConnect from "../../../db";
import Program from "../../../models/programModel";
import Student from "../../../models/studentModel";

export default async function handler(req, res) {
  await dbConnect();
 

  if (req.method === "GET") {
    let students = await Student.find()
      .where("status")
      .equals(true)
      .sort("-program");
    res.status(200).json(students);
  }
}
