const express = require("express");
const Studentrouter = express.Router();
const {
  addStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
} = require("../Controller/StudentController");
Studentrouter.get("/allstudents", getAllStudents);
Studentrouter.post("/add", addStudent);
Studentrouter.put("/:id", updateStudent);
Studentrouter.delete("/:id", deleteStudent);

module.exports = Studentrouter;
