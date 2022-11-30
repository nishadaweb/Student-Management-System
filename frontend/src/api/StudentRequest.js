import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });
export const getAllStudents = (formData) =>
  API.get("/student/allstudents", formData);
export const addStudent = (formData) => API.post("/student/add", formData);
export const updateStudent = (formData, id) =>
  API.put(`/student/${id}`, formData);
export const deleteStudent = (id) => API.delete(`/student/${id}`);
