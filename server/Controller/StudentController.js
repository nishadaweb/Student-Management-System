const Student = require("../Model/studentModel");
//Add a student
const addStudent = async (req, res) => {
  console.log(req.body);
  try {
    const std = req.body.std;
    const rollnumber = req.body.rollnumber;
    const oldStudent = await Student.findOne({ std, rollnumber });
    if (oldStudent) {
      return res.status(400).json({ message: "Student already exists" });
    } else {
      const newStudent = new Student(req.body);

      await newStudent.save();
      console.log(newStudent, "data");

      res.status(200).json(newStudent);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Edit a student
const updateStudent = async (req, res) => {
  const id = req.params.id;
  try {
    const students = await Student.findOne({ _id: id });
    await students.updateOne({ $set: req.body });
    res.status(200).json("Student data updated successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Delete a student
const deleteStudent = async (req, res) => {
  console.log("delete");
  const Id = req.params.id;

  try {
    console.log(Id, "delete");
    const student = await Student.findById(Id);
    await student.deleteOne();
    res.status(200).json("Student deleted successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addStudent, updateStudent, deleteStudent, getAllStudents };
