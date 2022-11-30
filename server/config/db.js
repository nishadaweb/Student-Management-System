const mongoose = require("mongoose");
const mongoconnection = mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((e) => {
    console.log("db not connected");
  });
module.exports = { mongoconnection };
