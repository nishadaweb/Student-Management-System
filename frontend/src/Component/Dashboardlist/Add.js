import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { addStudent } from "../../api/StudentRequest";

function Add({ students, setStudents, setIsAdding }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [std, setStd] = useState("");
  const [place, setPlace] = useState("");
  const [rollnumber, setRollnumber] = useState("");

  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.focus();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !std || !place || !rollnumber) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const id = students.length + 1;
    const newStudent = {
      id,
      firstName,
      lastName,
      std,
      place,
      rollnumber,
    };
    const { data } = await addStudent(newStudent);
    console.log(data, "add vdata");
    setIsAdding(false);

    Swal.fire({
      icon: "success",
      title: "Added!",
      text: `${firstName} ${lastName}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Student</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          ref={textInput}
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
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
}

export default Add;
