import React, { useState } from "react";
import Swal from "sweetalert2";

import Header from "../../Component/Dashboardlist/Header";
import List from "../../Component/Dashboardlist/List";
import Add from "../../Component/Dashboardlist/Add";
import Edit from "../../Component/Dashboardlist/Edit";
import { useEffect } from "react";
import { deleteStudent, getAllStudents } from "../../api/StudentRequest";

function Dashboard() {
  const [students, setStudents] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (id) => {
    const [student] = students.filter((student) => student.id === id);

    setSelectedStudent(student);
    setIsEditing(true);
  };
  useEffect(() => {
    async function getStudents() {
      const { data } = await getAllStudents();
      setStudents(data);
    }
    getStudents();
  });

  const handleDelete = (id) => {
    console.log(id, "del");
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.value) {
        const { data } = await deleteStudent(id);
        console.log(data, "ffff");
        const [student] = students.filter((student) => student._id === id);

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${student.firstName} ${student.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="container">
      {/* List */}
      {!isAdding && !isEditing && (
        <>
          <Header setIsAdding={setIsAdding} />
          <List
            students={students}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {/* Add */}
      {isAdding && (
        <Add
          students={students}
          setStudents={setStudents}
          setIsAdding={setIsAdding}
        />
      )}
      {/* Edit */}
      {isEditing && (
        <Edit
          students={students}
          selectedStudent={selectedStudent}
          setStudents={setStudents}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
}

export default Dashboard;
