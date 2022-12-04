import dbConnect from "../../../db";
import Program from "../../../models/programModel";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const programs = await Program.find();
      res.status(200).json(programs);
    } catch (err) {
      res.status(500).json(err);
    }
    // res.json({ message: "hello" });
  }

  if (req.method === "POST") {
    let programExist = await Program.findOne({ name: req.name });
    if (programExist) return;
    try {
      let program = new Program(req.body);
      await program.save();
      res.json(program);
    } catch (error) {
      res.status(400).json({ message: "Program exists" });
    }
  }
  if (req.method === "PUT") {
    let { id, ...others } = req.body;
    let program = await Program.findByIdAndUpdate(
      id,
      { $set: others },
      { new: true }
    );
    res.json(program);
    // res.send(id);
  }
}
