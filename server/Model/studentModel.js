const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    std: {
      type: Number,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    rollnumber: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Student", studentSchema);
