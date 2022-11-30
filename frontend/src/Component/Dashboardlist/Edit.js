import React, { useState } from "react";
import Swal from "sweetalert2";
import { updateStudent } from "../../api/StudentRequest";

function Edit({ students, selectedStudent, setStudents, setIsEditing }) {
  const id = selectedStudent._id;

  const [firstName, setFirstName] = useState(selectedStudent.firstName);
  const [lastName, setLastName] = useState(selectedStudent.lastName);
  const [std, setStd] = useState(selectedStudent.std);
  const [place, setPlace] = useState(selectedStudent.place);
  const [rollnumber, setRollnumber] = useState(selectedStudent.rollnumber);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !std || !place || !rollnumber) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const student = {
      id,
      firstName,
      lastName,
      std,
      place,
      rollnumber,
    };
    const { data } = await updateStudent(student, id);
    console.log(data, "edit data");

    for (let i = 0; i < students.length; i++) {
      if (students[i].id === id) {
        students.splice(i, 1, student);
        break;
      }
    }

    setStudents(students);
    setIsEditing(false);

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `${student.firstName} ${student.lastName}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Student</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="std">Std</label>
        <input
          id="std"
          type="number"
          name="std"
          value={std}
          onChange={(e) => setStd(e.target.value)}
        />
        <label htmlFor="place">Place</label>
        <input
          id="place"
          type="text"
          name="place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <label htmlFor="rollnumber">Roll number</label>
        <input
          id="rollnumber"
          type="number"
          name="rollnumber"
          value={rollnumber}
          onChange={(e) => setRollnumber(e.target.value)}
        />
        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
}

export default Edit;
