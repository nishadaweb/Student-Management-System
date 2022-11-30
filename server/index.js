const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const AuthRoute = require("./Routes/AuthRoute");
const StudentRoute = require("./Routes/StudentRoute");
const app = express();
const session = require("express-session");
const nocache = require("nocache");
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(nocache());
app.use(
  session({
    secret: "key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000000 },
  })
);

const connectDB = require("./config/db");

app.use("/auth", AuthRoute);
app.use("/student", StudentRoute);
app.listen(process.env.PORT || 5000, () =>
  console.log(`listening at ${process.env.PORT}`)
);
