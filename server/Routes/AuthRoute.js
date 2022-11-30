const express = require("express");
const Authrouter = express.Router();
const { registerUser, loginUser } = require("../Controller/AuthController");

Authrouter.post("/register", registerUser);
Authrouter.post("/login", loginUser);

module.exports = Authrouter;
